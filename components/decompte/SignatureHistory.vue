<template>
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900">Historique des signatures</h3>
    
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="(signature, index) in signatures" :key="index" class="px-4 py-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">
                {{ signature.role }}
              </p>
              <p class="text-sm text-gray-500">
                {{ new Date(signature.date).toLocaleString() }}
              </p>
              <p v-if="signature.comment" class="mt-1 text-sm text-gray-600">
                {{ signature.comment }}
              </p>
            </div>
            <div class="text-sm text-gray-500">
              {{ signature.type }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  signatures: Array<{
    role: string
    type: string
    date: string
    comment?: string
  }>
}>()
</script>