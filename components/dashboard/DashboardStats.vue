<template>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <div v-for="stat in stats" :key="stat.name" class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          {{ stat.name }}
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ stat.value }}
        </dd>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: dashboardData } = await useFetch('/api/analytics/dashboard')

const stats = computed(() => [
  { name: 'Total Décomptes', value: dashboardData.value?.totalDecomptes || 0 },
  { name: 'Montant Total', value: formatCurrency(dashboardData.value?.totalAmount || 0) },
  { name: 'En attente', value: dashboardData.value?.byStatus.find(s => s._id === 'SUBMITTED')?.count || 0 },
  { name: 'Approuvés', value: dashboardData.value?.byStatus.find(s => s._id === 'COMPLETED')?.count || 0 }
])

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}
</script>