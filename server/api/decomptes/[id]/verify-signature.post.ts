import { defineEventHandler, createError } from 'h3'
import { signatureService } from '../../../services/signature/signatureService'

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  if (!auth) {
    throw createError({
      statusCode: 401,
      message: 'Non autorisé'
    })
  }

  const body = await readBody(event)
  const { verificationId, code } = body

  try {
    const isValid = await signatureService.verifySignature(
      verificationId,
      code,
      auth.userId
    )

    return { success: isValid }
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }
})