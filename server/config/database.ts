import mongoose from 'mongoose'
import { useRuntimeConfig } from '#imports'

export async function connectDB() {
  try {
    const config = useRuntimeConfig()
    const MONGODB_URI = config.mongodbUri

    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }

    const options = {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    await mongoose.connect(MONGODB_URI, options)
    console.log('✅ MongoDB connected successfully')
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message)
    process.exit(1)
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect()
    console.log('✅ MongoDB disconnected successfully')
  } catch (error: any) {
    console.error('❌ MongoDB disconnection error:', error.message)
  }
}