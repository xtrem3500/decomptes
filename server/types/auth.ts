import { z } from 'zod'

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  CHEF_MISSION = 'CHEF_MISSION',
  DTZ = 'DTZ',
  COURRIER = 'COURRIER'
}

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export interface TokenPayload {
  userId: string
  role: Role
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    role: Role
  }
}