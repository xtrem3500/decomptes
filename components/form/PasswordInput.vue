<template>
  <div class="relative">
    <input
      :id="id"
      :type="showPassword ? 'text' : 'password'"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      v-bind="$attrs"
      class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-paypal-lightGray placeholder-gray-500 text-paypal-gray focus:outline-none focus:ring-paypal-lightBlue focus:border-paypal-lightBlue sm:text-sm pr-10"
    />
    <button
      type="button"
      class="absolute inset-y-0 right-0 pr-3 flex items-center"
      @click="togglePassword"
    >
      <Icon
        :name="showPassword ? 'heroicons:eye' : 'heroicons:eye-slash'"
        class="h-5 w-5 text-paypal-gray"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  id: string
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const showPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>