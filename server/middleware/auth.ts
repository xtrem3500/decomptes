import { defineEventHandler, createError } from 'h3'
import { verifyToken } from '../config/jwt'

export default defineEventHandler(async (event) => {
  // Public routes that don't require authentication
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/health',
    '/',  // Allow access to home page
    '/auth/login',
    '/auth/register'
  ]

  // Check if route is public
  if (publicRoutes.some(route => event.path.startsWith(route))) {
    return
  }

  try {
    const authHeader = event.node.req.headers['authorization'] || event.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        message: 'Token d\'authentification manquant'
      })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)
    
    event.context.auth = decoded

    if (event.path.startsWith('/api/admin') && decoded.role !== 'ADMIN') {
      throw createError({
        statusCode: 403,
        message: 'Accès non autorisé'
      })
    }
  } catch (error: any) {
    throw createError({
      statusCode: 401,
      message: error.message || 'Token invalide'
    })
  }
})