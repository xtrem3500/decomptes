import { defineEventHandler, createError, readBody } from 'h3'
import { Decompte } from '~/server/models/Decompte'
import { signatureSchema } from '~/server/types/decompte'
import { Role } from '~/server/types/auth'
import { User } from '~/server/models/User'

const roleWorkflow = {
  [Role.CHEF_MISSION]: 'VALIDATED_CHEF_MISSION',
  [Role.DTZ]: 'VALIDATED_DTZ',
  [Role.COURRIER]: 'VALIDATED_COURRIER'
}

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

  const body = await readBody(event)
  const signatureData = signatureSchema.parse(body)

  const decompte = await Decompte.findById(id)
  if (!decompte) {
    throw createError({
      statusCode: 404,
      message: 'Décompte non trouvé'
    })
  }

  const user = await User.findById(auth.userId)
  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'Utilisateur non trouvé'
    })
  }

  // Vérifier que l'utilisateur a le bon rôle pour signer
  const nextStatus = roleWorkflow[user.role]
  if (!nextStatus) {
    throw createError({
      statusCode: 403,
      message: 'Vous n\'avez pas les droits pour signer ce décompte'
    })
  }

  // Vérifier que le décompte est dans le bon état pour cette signature
  const isValidWorkflow = (
    (decompte.status === 'SUBMITTED' && user.role === Role.CHEF_MISSION) ||
    (decompte.status === 'VALIDATED_CHEF_MISSION' && user.role === Role.DTZ) ||
    (decompte.status === 'VALIDATED_DTZ' && user.role === Role.COURRIER)
  )

  if (!isValidWorkflow) {
    throw createError({
      statusCode: 400,
      message: 'Le décompte n\'est pas dans le bon état pour cette signature'
    })
  }

  // Ajouter la signature
  decompte.signatures.push({
    userId: auth.userId,
    type: signatureData.type,
    signature: signatureData.signature,
    role: user.role,
    comment: signatureData.comment,
    date: new Date()
  })

  // Mettre à jour le statut
  decompte.status = nextStatus
  if (nextStatus === 'VALIDATED_COURRIER') {
    decompte.status = 'COMPLETED'
  }

  await decompte.save()

  return decompte
})