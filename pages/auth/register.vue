<template>
  <div class="min-h-screen flex items-center justify-center bg-paypal-sand py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-paypal-white rounded-paypal shadow-lg p-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-paypal-blue">
          Créer un compte
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-paypal-gray mb-1">Email</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-paypal-lightGray placeholder-gray-500 text-paypal-gray focus:outline-none focus:ring-paypal-lightBlue focus:border-paypal-lightBlue sm:text-sm"
              placeholder="Votre email"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-paypal-gray mb-1">Mot de passe</label>
            <PasswordInput
              id="password"
              v-model="password"
              name="password"
              required
              placeholder="Votre mot de passe"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-paypal-blue hover:bg-paypal-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-paypal-lightBlue transition-colors duration-200"
            :disabled="loading"
          >
            {{ loading ? 'Création...' : 'Créer un compte' }}
          </button>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>

        <div class="text-center">
          <NuxtLink 
            to="/auth/login" 
            class="text-paypal-lightBlue hover:text-paypal-blue text-sm transition-colors duration-200"
          >
            Déjà un compte ? Se connecter
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import PasswordInput from '~/components/form/PasswordInput.vue'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  try {
    loading.value = true
    error.value = ''
    await auth.register(email.value, password.value)
    await auth.login(email.value, password.value)
    router.push('/')
  } catch (e: any) {
    error.value = e.message || 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>