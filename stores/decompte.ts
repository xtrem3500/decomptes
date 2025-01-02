import { defineStore } from 'pinia'
import type { Decompte, CreateDecompteDTO } from '~/server/types/decompte'

interface DecompteState {
  decomptes: Decompte[]
  currentDecompte: Decompte | null
  loading: boolean
  error: string | null
}

export const useDecompteStore = defineStore('decompte', {
  state: (): DecompteState => ({
    decomptes: [],
    currentDecompte: null,
    loading: false,
    error: null
  }),

  getters: {
    getDecompteById: (state) => (id: string) => 
      state.decomptes.find(d => d.id === id)
  },

  actions: {
    async fetchDecomptes() {
      const fetchAuth = useFetchAuth()
      this.loading = true
      try {
        const decomptes = await fetchAuth('/api/decomptes')
        this.decomptes = decomptes
        this.error = null
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchDecompte(id: string) {
      const fetchAuth = useFetchAuth()
      this.loading = true
      try {
        const decompte = await fetchAuth(`/api/decomptes/${id}`)
        this.currentDecompte = decompte
        this.error = null
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createDecompte(decompte: CreateDecompteDTO) {
      const fetchAuth = useFetchAuth()
      this.loading = true
      try {
        const newDecompte = await fetchAuth('/api/decomptes', {
          method: 'POST',
          body: decompte
        })
        this.decomptes.push(newDecompte)
        this.error = null
        return newDecompte
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async submitDecompte(id: string) {
      const fetchAuth = useFetchAuth()
      this.loading = true
      try {
        const updatedDecompte = await fetchAuth(`/api/decomptes/${id}/submit`, {
          method: 'POST'
        })
        const index = this.decomptes.findIndex(d => d.id === id)
        if (index !== -1) {
          this.decomptes[index] = updatedDecompte
        }
        if (this.currentDecompte?.id === id) {
          this.currentDecompte = updatedDecompte
        }
        this.error = null
        return updatedDecompte
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})