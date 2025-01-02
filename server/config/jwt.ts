import jwt from 'jsonwebtoken'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export interface JWTPayload {
  userId: string
  role: string
  iat?: number
  exp?: number
}

export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, config.jwtSecret) as JWTPayload
  } catch (error) {
    throw new Error('Invalid token')
  }
}