<template>
  <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    >
      {{ link.text }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const links = [
  { to: '/', text: 'Accueil' },
  { to: '/decomptes', text: 'Décomptes' }
]
</script>