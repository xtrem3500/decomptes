import mongoose from 'mongoose'
import { Status, SignatureType } from '../types/decompte'

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
  historique: [{
    status: {
      type: String,
      enum: Object.values(Status),
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: String,
  }],
}, {
  timestamps: true,
})

// Middleware pour mettre à jour l'historique
decompteSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.historique.push({
      status: this.status,
      date: new Date(),
      userId: this.signatures[this.signatures.length - 1]?.userId,
      comment: this.signatures[this.signatures.length - 1]?.comment,
    })
  }
  next()
})

export const Decompte = mongoose.model('Decompte', decompteSchema)