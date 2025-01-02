<template>
  <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h2 class="text-2xl font-semibold text-gray-900">Nouveau Décompte</h2>
        <p class="mt-2 text-sm text-gray-700">
          Créez un nouveau décompte en remplissant le formulaire ci-dessous
        </p>
      </div>
    </div>
    <div class="mt-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="numero" class="block text-sm font-medium text-gray-700">Numéro</label>
          <input
            id="numero"
            v-model="form.numero"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <div>
          <label for="montant" class="block text-sm font-medium text-gray-700">Montant total</label>
          <input
            id="montant"
            v-model.number="form.montant"
            type="number"
            step="0.01"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {{ loading ? 'Création...' : 'Créer le décompte' }}
          </button>
        </div>

        <div v-if="error" class="text-red-600 text-sm">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDecompteStore } from '~/stores/decompte'
import { useRouter } from 'vue-router'

const decompteStore = useDecompteStore()
const router = useRouter()

const form = ref({
  numero: '',
  description: '',
  montant: 0,
  lignes: []
})

const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  try {
    loading.value = true
    error.value = ''
    const newDecompte = await decompteStore.createDecompte(form.value)
    router.push(`/decomptes/${newDecompte.id}`)
  } catch (e: any) {
    error.value = e.message || 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>