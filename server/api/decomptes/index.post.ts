import { defineEventHandler, createError, readBody } from 'h3'
import { Decompte } from '~/server/models/Decompte'
import { decompteSchema } from '~/server/types/decompte'

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  if (!auth) {
    throw createError({
      statusCode: 401,
      message: 'Non autorisé'
    })
  }

  const body = await readBody(event)
  const data = decompteSchema.parse(body)

  const decompte = new Decompte({
    ...data,
    userId: auth.userId
  })

  await decompte.save()
  return decompte
})