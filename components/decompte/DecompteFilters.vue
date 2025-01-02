<template>
  <div class="bg-white p-4 rounded-lg shadow mb-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Recherche textuelle -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Recherche</label>
        <input
          v-model="filters.search"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Rechercher..."
          @input="applyFilters"
        />
      </div>

      <!-- Filtre par statut -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Statut</label>
        <select
          v-model="filters.status"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @change="applyFilters"
        >
          <option value="">Tous</option>
          <option v-for="status in statusOptions" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>

      <!-- Filtre par date -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Période</label>
        <select
          v-model="filters.period"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          @change="applyFilters"
        >
          <option value="all">Toutes les périodes</option>
          <option value="today">Aujourd'hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
          <option value="year">Cette année</option>
        </select>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-4 flex justify-end space-x-3">
      <button
        @click="resetFilters"
        class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Réinitialiser
      </button>
      <button
        @click="saveFilters"
        class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sauvegarder
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Status } from '~/server/types/decompte'

const statusOptions = Object.values(Status)

const filters = ref({
  search: '',
  status: '',
  period: 'all'
})

const emit = defineEmits<{
  (e: 'filter', filters: any): void
}>()

function applyFilters() {
  emit('filter', { ...filters.value })
}

function resetFilters() {
  filters.value = {
    search: '',
    status: '',
    period: 'all'
  }
  applyFilters()
}

function saveFilters() {
  localStorage.setItem('decompte-filters', JSON.stringify(filters.value))
}

// Charger les filtres sauvegardés
onMounted(() => {
  const savedFilters = localStorage.getItem('decompte-filters')
  if (savedFilters) {
    filters.value = JSON.parse(savedFilters)
    applyFilters()
  }
})
</script>