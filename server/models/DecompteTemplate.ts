import mongoose from 'mongoose'

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  defaultMontant: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: 'EUR',
  },
  categories: [{
    name: String,
    defaultAmount: Number,
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
})

export const DecompteTemplate = mongoose.model('DecompteTemplate', templateSchema)