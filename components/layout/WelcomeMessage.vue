<template>
  <div class="text-center space-y-4">
    <h1 class="text-4xl font-bold text-gray-900">
      Bienvenue sur l'application de Gestion des Décomptes
    </h1>
    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
      Une solution simple et efficace pour gérer vos décomptes de frais avec signature électronique et génération automatique de PDF.
    </p>
    <div class="flex justify-center space-x-4 pt-4">
      <NuxtLink
        to="/decomptes"
        class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Voir mes décomptes
      </NuxtLink>
      <NuxtLink
        to="/decomptes/new"
        class="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
      >
        Nouveau décompte
      </NuxtLink>
    </div>
  </div>
</template>