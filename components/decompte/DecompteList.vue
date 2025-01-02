<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-900">Mes Décomptes</h2>
      <NuxtLink
        to="/decomptes/new"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Nouveau Décompte
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-center py-4">
      <p class="text-gray-500">Chargement...</p>
    </div>

    <div v-else-if="error" class="text-center py-4">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <div v-else-if="decomptes.length === 0" class="text-center py-4">
      <p class="text-gray-500">Aucun décompte trouvé</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Numéro
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Montant
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="decompte in decomptes" :key="decompte.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ decompte.numero }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(decompte.date).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ decompte.montant.toFixed(2) }} €
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="statusClass(decompte.status)">
                {{ decompte.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex space-x-2">
                <NuxtLink
                  :to="`/decomptes/${decompte.id}`"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  Voir
                </NuxtLink>
                <button
                  v-if="decompte.status === 'DRAFT'"
                  @click="submitDecompte(decompte.id)"
                  class="text-green-600 hover:text-green-900"
                >
                  Soumettre
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDecompteStore } from '~/stores/decompte'
import { Status } from '@prisma/client'

const decompteStore = useDecompteStore()
const { decomptes, loading, error } = storeToRefs(decompteStore)

onMounted(() => {
  decompteStore.fetchDecomptes()
})

function statusClass(status: Status) {
  const classes = {
    DRAFT: 'bg-gray-100 text-gray-800',
    SUBMITTED: 'bg-blue-100 text-blue-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800'
  }
  return `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classes[status]}`
}

async function submitDecompte(id: string) {
  try {
    await decompteStore.submitDecompte(id)
  } catch (error) {
    // L'erreur est déjà gérée dans le store
  }
}
</script>