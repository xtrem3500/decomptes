import { createHash } from 'crypto'
import { smsService } from '../sms/smsService'
import { SignatureAttempt, SignatureVerification } from './types'
import { redis } from '../../utils/redis'

export class SignatureService {
  private readonly VERIFICATION_EXPIRY = 300 // 5 minutes
  private readonly MAX_ATTEMPTS = 3
  private readonly LOCKOUT_DURATION = 1800 // 30 minutes

  async initiateSignature(userId: string, decompteId: string): Promise<SignatureVerification> {
    // Vérifier si l'utilisateur n'est pas bloqué
    const isLocked = await this.isUserLocked(userId)
    if (isLocked) {
      throw new Error('Trop de tentatives. Veuillez réessayer plus tard.')
    }

    // Générer un code de vérification
    const verificationCode = this.generateVerificationCode()
    const verificationId = this.generateVerificationId(userId, decompteId)

    // Stocker le code avec une expiration
    await redis.setex(
      `signature:${verificationId}`,
      this.VERIFICATION_EXPIRY,
      verificationCode
    )

    return {
      verificationId,
      expiresIn: this.VERIFICATION_EXPIRY
    }
  }

  async verifySignature(
    verificationId: string,
    code: string,
    userId: string
  ): Promise<boolean> {
    const storedCode = await redis.get(`signature:${verificationId}`)
    if (!storedCode) {
      throw new Error('Code de vérification expiré ou invalide')
    }

    const attempt: SignatureAttempt = {
      userId,
      verificationId,
      success: storedCode === code,
      timestamp: new Date()
    }

    await this.recordAttempt(attempt)

    if (!attempt.success) {
      const attempts = await this.getAttempts(userId)
      if (attempts.length >= this.MAX_ATTEMPTS) {
        await this.lockUser(userId)
        throw new Error('Compte temporairement bloqué après trop de tentatives')
      }
      throw new Error('Code de vérification incorrect')
    }

    // Supprimer le code après une vérification réussie
    await redis.del(`signature:${verificationId}`)
    return true
  }

  private generateVerificationCode(): string {
    return Math.random().toString().slice(2, 8)
  }

  private generateVerificationId(userId: string, decompteId: string): string {
    return createHash('sha256')
      .update(`${userId}:${decompteId}:${Date.now()}`)
      .digest('hex')
  }

  private async recordAttempt(attempt: SignatureAttempt): Promise<void> {
    const key = `signature:attempts:${attempt.userId}`
    await redis.lpush(key, JSON.stringify(attempt))
    await redis.ltrim(key, 0, 9) // Garder les 10 dernières tentatives
  }

  private async getAttempts(userId: string): Promise<SignatureAttempt[]> {
    const attempts = await redis.lrange(`signature:attempts:${userId}`, 0, -1)
    return attempts.map(a => JSON.parse(a))
  }

  private async isUserLocked(userId: string): Promise<boolean> {
    return await redis.exists(`signature:locked:${userId}`) === 1
  }

  private async lockUser(userId: string): Promise<void> {
    await redis.setex(
      `signature:locked:${userId}`,
      this.LOCKOUT_DURATION,
      '1'
    )
  }
}

export const signatureService = new SignatureService()