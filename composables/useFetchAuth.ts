import { useAuthStore } from '~/stores/auth'

export function useFetchAuth() {
  const authStore = useAuthStore()
  
  return async (url: string, options: any = {}) => {
    const token = authStore.token
    
    if (!token) {
      throw new Error('Non authentifié')
    }

    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    }
    
    try {
      return await $fetch(url, {
        ...options,
        headers
      })
    } catch (error: any) {
      if (error.statusCode === 401) {
        authStore.logout()
        navigateTo('/auth/login')
      }
      throw error
    }
  }
}