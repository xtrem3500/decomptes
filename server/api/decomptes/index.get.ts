import { defineEventHandler, createError } from 'h3'
import { Decompte } from '~/server/models/Decompte'

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  if (!auth) {
    throw createError({
      statusCode: 401,
      message: 'Non autorisé'
    })
  }

  const decomptes = await Decompte.find({ userId: auth.userId })
    .populate({
      path: 'signatures.userId',
      select: 'email role'
    })
    .sort({ createdAt: -1 })

  return decomptes
})