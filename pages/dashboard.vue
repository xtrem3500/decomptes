<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
    
    <DashboardStats />
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Statistiques mensuelles</h2>
        <MonthlyChart :data="monthlyStats" />
      </div>
      
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Statuts des décomptes</h2>
        <StatusChart :data="statusStats" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardStats from '~/components/dashboard/DashboardStats.vue'

const { data: dashboardData } = await useFetch('/api/analytics/dashboard')

const monthlyStats = computed(() => dashboardData.value?.monthlyStats || [])
const statusStats = computed(() => dashboardData.value?.byStatus || [])
</script>