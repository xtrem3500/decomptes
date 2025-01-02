import { defineEventHandler } from 'h3'
import mongoose from 'mongoose'

export default defineEventHandler(async () => {
  const isConnected = mongoose.connection.readyState === 1

  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: isConnected ? 'connected' : 'disconnected'
  }
})