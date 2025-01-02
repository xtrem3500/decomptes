//middleware/auth.global.ts
import axios from 'axios'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  // Liste des routes publiques
  const publicRoutes = ['/auth/login', '/auth/register']
  
  // Vérifier si la route est publique
  if (publicRoutes.includes(to.path)) {
    return
  }

  // Vérifier l'authentification
  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }

  // Ajouter le token aux headers de toutes les requêtes
  if (authStore.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`
  }
})