<template>
  <div class="flex items-center space-x-4">
    <template v-if="auth.isAuthenticated">
      <span class="text-sm text-gray-700">{{ auth.user?.email }}</span>
      <button
        @click="handleLogout"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Déconnexion
      </button>
    </template>
    <template v-else>
      <NuxtLink
        to="/auth/login"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Connexion
      </NuxtLink>
      <NuxtLink
        to="/auth/register"
        class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        S'inscrire
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/auth/login')
}
</script>