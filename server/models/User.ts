import mongoose from 'mongoose'
import { Role } from '../types/auth'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.USER,
  },
}, {
  timestamps: true,
})

export const User = mongoose.model('User', userSchema)