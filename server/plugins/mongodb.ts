import mongoose from 'mongoose'
import { useRuntimeConfig } from '#imports'

export default defineNitroPlugin(async () => {
  try {
    const config = useRuntimeConfig()
    const MONGODB_URI = config.mongodbUri

    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }

    await mongoose.connect(MONGODB_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    
    console.log('✅ MongoDB connected successfully')
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected')
    })

  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message)
  }
})