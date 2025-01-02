import { useAuthStore } from '~/stores/auth'

export function useAuth() {
  const store = useAuthStore()
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      await store.login(email, password)
      router.push('/')
    } catch (error: any) {
      throw new Error(error.message || 'Login failed')
    }
  }

  const logout = () => {
    store.logout()
    router.push('/auth/login')
  }

  return {
    login,
    logout,
    isAuthenticated: computed(() => store.isAuthenticated),
    user: computed(() => store.user)
  }
}