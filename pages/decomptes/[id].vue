<template>
  <div v-if="loading" class="text-center py-4">
    <p class="text-gray-500">Chargement...</p>
  </div>

  <div v-else-if="error" class="text-center py-4">
    <p class="text-red-500">{{ error }}</p>
  </div>

  <div v-else-if="decompte" class="space-y-6">
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Décompte #{{ decompte.numero }}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Créé le {{ new Date(decompte.date).toLocaleDateString() }}
        </p>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Montant</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ decompte.montant.toFixed(2) }} €</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Statut</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <span :class="statusClass(decompte.status)">
                {{ decompte.status }}
              </span>
            </dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Description</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ decompte.description }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <SignatureHistory v-if="decompte.signatures?.length" :signatures="decompte.signatures" />
    
    <SignatureForm 
      v-if="canSign" 
      :decompte-id="decompte.id" 
      @signed="refreshDecompte"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDecompteStore } from '~/stores/decompte'
import { useAuthStore } from '~/stores/auth'
import { Status } from '~/server/types/decompte'

const route = useRoute()
const decompteStore = useDecompteStore()
const authStore = useAuthStore()

const decompte = computed(() => decompteStore.currentDecompte)
const loading = computed(() => decompteStore.loading)
const error = computed(() => decompteStore.error)

const canSign = computed(() => {
  if (!decompte.value || !authStore.user) return false
  
  // Logique pour déterminer si l'utilisateur peut signer en fonction de son rôle
  // et du statut actuel du décompte
  return true // À adapter selon vos règles métier
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

async function refreshDecompte() {
  const id = route.params.id as string
  await decompteStore.fetchDecompte(id)
}

onMounted(refreshDecompte)
</script>