import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()

  // Initialiser l'état d'authentification au démarrage
  if (process.client) {
    const auth = localStorage.getItem('auth')
    if (auth) {
      const { token, user } = JSON.parse(auth)
      authStore.setAuth({ token, user })
    }
  }

  // Intercepteur global pour les requêtes
  nuxtApp.vueApp.provide('fetch', (url: string, options: any = {}) => {
    const token = authStore.token
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    }
    return $fetch(url, options)
  })
})