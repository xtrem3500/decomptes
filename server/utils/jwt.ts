import jwt from 'jsonwebtoken'
import { Role } from '@prisma/client'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface TokenPayload {
  userId: string
  role: Role
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload
}