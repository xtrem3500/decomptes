import { defineEventHandler, readBody, createError } from 'h3'
import { generateToken } from '../../config/jwt'
import { User } from '../../models/User.js'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email et mot de passe requis'
      })
    }

    const user = await User.findOne({ email })
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect'
      })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect'
      })
    }

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role
    })

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur interne du serveur'
    })
  }
})