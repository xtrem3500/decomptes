import { defineEventHandler, createError } from 'h3'
import { Decompte } from '~/server/models/Decompte'
import { Status } from '~/server/types/decompte'

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  if (!auth) {
    throw createError({
      statusCode: 401,
      message: 'Non autorisé'
    })
  }

  const id = event.context.params?.id
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID du décompte manquant'
    })
  }

  const decompte = await Decompte.findById(id)
  if (!decompte) {
    throw createError({
      statusCode: 404,
      message: 'Décompte non trouvé'
    })
  }

  if (decompte.userId.toString() !== auth.userId) {
    throw createError({
      statusCode: 403,
      message: 'Non autorisé à soumettre ce décompte'
    })
  }

  if (decompte.status !== Status.DRAFT) {
    throw createError({
      statusCode: 400,
      message: 'Le décompte doit être en brouillon pour être soumis'
    })
  }

  decompte.status = Status.SUBMITTED
  decompte.signatures.push({
    userId: auth.userId,
    status: 'SIGNED',
    date: new Date()
  })

  await decompte.save()

  return decompte
})