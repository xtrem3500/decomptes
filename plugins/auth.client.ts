import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  // Only run on client-side
  if (process.client) {
    const authStore = useAuthStore()
    
    // Initialize auth state from localStorage
    try {
      const auth = localStorage.getItem('auth')
      if (auth) {
        const parsed = JSON.parse(auth)
        authStore.setAuth(parsed)
      }
    } catch (error) {
      console.error('Error initializing auth state:', error)
      localStorage.removeItem('auth')
    }
  }
})