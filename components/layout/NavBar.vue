<template>
  <nav class="bg-paypal-gradient shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img src="/logo.png" alt="Logo" class="h-10 w-auto rounded-full" />
          </div>
          <ClientNavigation class="ml-6" />
        </div>
        <ClientOnly>
          <AuthButton />
        </ClientOnly>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import ClientNavigation from './ClientNavigation.vue'
import AuthButton from '../auth/AuthButton.vue'
</script>

<style scoped>
.bg-paypal-gradient {
  background: linear-gradient(90deg, #003087, #009cde); /* Dégradé des couleurs de PayPal */
}

img {
  width: auto;
  height: 3rem; /* Ajuste la hauteur pour s'assurer que le logo est bien visible */
  object-fit: contain;
  border-radius: 50%; /* Bords arrondis pour le logo (rond) */
}
</style>
