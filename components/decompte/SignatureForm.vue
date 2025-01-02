<template>
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900">Signature électronique</h3>
    
    <div class="bg-white p-4 rounded-lg border">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Type de signature
          </label>
          <select
            v-model="form.type"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="ELECTRONIC">Électronique</option>
            <option value="PHYSICAL">Physique</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Signature
          </label>
          <input
            v-model="form.signature"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Votre signature"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Commentaire (optionnel)
          </label>
          <textarea
            v-model="form.comment"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ loading ? 'Signature en cours...' : 'Signer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SignatureType } from '~/server/types/decompte'

const props = defineProps<{
  decompteId: string
}>()

const emit = defineEmits<{
  (e: 'signed'): void
}>()

const form = ref({
  type: SignatureType.ELECTRONIC,
  signature: '',
  comment: ''
})

const loading = ref(false)

async function handleSubmit() {
  try {
    loading.value = true
    await $fetch(`/api/decomptes/${props.decompteId}/sign`, {
      method: 'POST',
      body: {
        ...form.value,
        date: new Date()
      }
    })
    emit('signed')
  } catch (error: any) {
    console.error('Erreur lors de la signature:', error)
    alert(error.message || 'Une erreur est survenue')
  } finally {
    loading.value = false
  }
}
</script>