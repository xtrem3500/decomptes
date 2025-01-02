import mongoose from 'mongoose'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const MONGODB_URI = config.mongodbUri || 'mongodb://localhost:27017/gestion-decomptes'

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect()
    console.log('✅ Disconnected from MongoDB')
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error)
  }
}