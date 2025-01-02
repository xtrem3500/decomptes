<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-medium text-gray-900">
            Décompte #{{ decompte.numero }}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ new Date(decompte.date).toLocaleDateString() }}
          </p>
        </div>
        <span :class="statusClass">
          {{ decompte.status }}
        </span>
      </div>
      <div class="mt-4">
        <p class="text-sm text-gray-600">{{ decompte.description }}</p>
        <p class="mt-2 text-lg font-semibold text-gray-900">
          {{ decompte.montant.toFixed(2) }} €
        </p>
      </div>
      <div v-if="decompte.pdfUrl" class="mt-4">
        <a
          :href="decompte.pdfUrl"
          target="_blank"
          class="text-sm text-indigo-600 hover:text-indigo-900"
        >
          Voir le PDF
        </a>
      </div>
    </div>
    <div class="bg-gray-50 px-4 py-4 sm:px-6">
      <div class="flex justify-end space-x-3">
        <NuxtLink
          :to="`/decomptes/${decompte._id}`"
          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          Détails
        </NuxtLink>
        <button
          v-if="decompte.status === 'DRAFT'"
          @click="$emit('submit', decompte._id)"
          class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
        >
          Soumettre
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  decompte: any
}>()

defineEmits<{
  (e: 'submit', id: string): void
}>()

const statusClass = computed(() => {
  const classes = {
    DRAFT: 'bg-gray-100 text-gray-800',
    SUBMITTED: 'bg-blue-100 text-blue-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800'
  }
  return `px-2 py-1 text-xs font-medium rounded-full ${classes[props.decompte.status]}`
})
</script>