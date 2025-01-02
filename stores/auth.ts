import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password },
        })
        this.setAuth(response)
        return response
      } catch (error) {
        throw error
      }
    },

    setAuth(response: { token: string; user: User }) {
      this.token = response.token
      this.user = response.user
      if (process.client) {
        localStorage.setItem('auth', JSON.stringify(response))
      }
    },

    logout() {
      this.user = null
      this.token = null
      if (process.client) {
        localStorage.removeItem('auth')
      }
      navigateTo('/auth/login')
    },
  },
})