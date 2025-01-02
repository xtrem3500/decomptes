import mongoose from 'mongoose'
import { Status, SignatureType } from '../types/decompte'
import { generatePDF } from '../utils/pdf'

const ligneSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const signatureSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(SignatureType),
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  comment: String,
  date: {
    type: Date,
    default: Date.now,
  },
})

const decompteSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  montant: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(Status),
    default: Status.DRAFT,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lignes: [ligneSchema],
  signatures: [signatureSchema],
  pdfUrl: String,
}, {
  timestamps: true,
})

// Middleware pour générer le PDF après chaque signature
decompteSchema.post('save', async function(doc) {
  if (doc.isModified('signatures') || doc.isModified('status')) {
    try {
      const pdfUrl = await generatePDF(doc)
      // Mise à jour du lien PDF sans déclencher les hooks
      await mongoose.model('Decompte').updateOne(
        { _id: doc._id },
        { pdfUrl }
      )
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error)
    }
  }
})

export const Decompte = mongoose.model('Decompte', decompteSchema)