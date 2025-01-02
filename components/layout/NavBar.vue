<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img src="/logo-placeholder.png" alt="Logo" class="h-8 w-auto" />
          </div>
          <HorizontalNavigation class="ml-6" />
        </div>
        <AuthButton />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import HorizontalNavigation from './HorizontalNavigation.vue'
import AuthButton from '../auth/AuthButton.vue'
</script>