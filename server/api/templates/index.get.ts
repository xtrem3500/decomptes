import { defineEventHandler, createError } from 'h3'
import { DecompteTemplate } from '~/server/models/DecompteTemplate'

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  if (!auth) {
    throw createError({
      statusCode: 401,
      message: 'Non autorisé'
    })
  }

  const templates = await DecompteTemplate.find({ createdBy: auth.userId })
  return templates
})