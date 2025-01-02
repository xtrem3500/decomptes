import { z } from 'zod'

export enum Status {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  VALIDATED_CHEF_MISSION = 'VALIDATED_CHEF_MISSION',
  VALIDATED_DTZ = 'VALIDATED_DTZ',
  VALIDATED_COURRIER = 'VALIDATED_COURRIER',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}

export enum SignatureType {
  ELECTRONIC = 'ELECTRONIC',
  PHYSICAL = 'PHYSICAL'
}

export const signatureSchema = z.object({
  type: z.enum([SignatureType.ELECTRONIC, SignatureType.PHYSICAL]),
  signature: z.string().min(1),
  comment: z.string().optional(),
  date: z.date()
})

export const ligneSchema = z.object({
  description: z.string().min(1),
  montant: z.number().positive(),
  date: z.date()
})

export const decompteSchema = z.object({
  numero: z.string(),
  description: z.string().min(1),
  montant: z.number().positive(),
  lignes: z.array(ligneSchema)
})

export type CreateDecompteDTO = z.infer<typeof decompteSchema>
export type CreateLigneDTO = z.infer<typeof ligneSchema>
export type SignatureDTO = z.infer<typeof signatureSchema>