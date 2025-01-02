import type { DecompteTemplate } from '~/types/template'

export function useTemplates() {
  const templates = ref<DecompteTemplate[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchTemplates = async () => {
    const fetchAuth = useFetchAuth()
    loading.value = true
    try {
      templates.value = await fetchAuth('/api/templates')
      error.value = null
    } catch (err: any) {
      error.value = err.message || 'Failed to load templates'
      console.error('Error loading templates:', err)
    } finally {
      loading.value = false
    }
  }

  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency
    }).format(amount)
  }

  return {
    templates,
    loading,
    error,
    fetchTemplates,
    formatCurrency
  }
}