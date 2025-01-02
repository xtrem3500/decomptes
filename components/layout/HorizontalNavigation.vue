<template>
  <nav class="hidden sm:flex sm:space-x-8">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="flex items-center px-3 py-2 text-sm font-medium text-white hover:text-paypal-lightBlue"
    >
      <Icon
        :name="link.icon"
        class="h-5 w-5 mr-2"
        aria-hidden="true"
      />
      {{ link.label }}
      <span
        v-if="link.badge"
        class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-paypal-lightBlue text-white"
      >
        {{ link.badge }}
      </span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const links = [
  {
    label: 'Tableau de bord',
    icon: 'heroicons:home',
    to: '/dashboard'
  },
  {
    label: 'Mes décomptes',
    icon: 'heroicons:document-text',
    to: '/decomptes',
    badge: 3
  },
  {
    label: 'Nouveau décompte',
    icon: 'heroicons:plus-circle',
    to: '/decomptes/new'
  },
  {
    label: 'Historique',
    icon: 'heroicons:clock',
    to: '/history'
  }
]
</script>