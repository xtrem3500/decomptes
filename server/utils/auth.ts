import bcrypt from 'bcryptjs'
import { createError } from 'h3'
import { User } from '../models/User'

export async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function findUserByEmail(email: string) {
  return User.findOne({ email })
}

export function createAuthError() {
  return createError({
    statusCode: 401,
    message: 'Email ou mot de passe incorrect',
  })
}