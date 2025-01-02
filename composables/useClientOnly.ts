// Utility to handle client-side only functionality
export function useClientOnly() {
  const isClient = ref(false)
  
  onMounted(() => {
    isClient.value = true
  })

  return {
    isClient
  }
}