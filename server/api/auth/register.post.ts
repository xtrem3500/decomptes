import { z } from 'zod'
import { hashPassword, findUserByEmail } from '~/server/utils/auth'
import { registerSchema } from '~/server/types/auth' 

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = registerSchema.parse(body)

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Un utilisateur avec cet email existe déjà',
      })
    }

    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    })

    return user
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: 'Données invalides',
      })
    }
    throw error
  }
})