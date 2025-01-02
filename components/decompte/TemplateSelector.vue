<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">Templates disponibles</h3>
      <button
        @click="showCreateForm = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Nouveau template
      </button>
    </div>

    <div v-if="loading" class="text-center py-4">
      <p class="text-gray-500">Chargement des templates...</p>
    </div>

    <div v-else-if="error" class="text-center py-4 text-red-500">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div
        v-for="template in templates"
        :key="template._id"
        class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
        @click="selectTemplate(template)"
      >
        <h4 class="font-medium">{{ template.name }}</h4>
        <p class="text-sm text-gray-500">{{ template.description }}</p>
        <p class="mt-2 text-sm">
          Montant par défaut: {{ formatCurrency(template.defaultMontant, template.currency) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DecompteTemplate } from '~/types/template'
import { useTemplates } from '~/composables/useTemplates'

const showCreateForm = ref(false)
const { templates, loading, error, fetchTemplates, formatCurrency } = useTemplates()

const emit = defineEmits<{
  (e: 'select', template: DecompteTemplate): void
}>()

function selectTemplate(template: DecompteTemplate) {
  emit('select', template)
}

onMounted(() => {
  fetchTemplates()
})
</script>