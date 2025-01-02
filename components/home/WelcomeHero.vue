<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Gestion des Décomptes
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Une solution simple et efficace pour gérer vos décomptes de frais avec signature électronique.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <NuxtLink
            to="/auth/login"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Commencer
          </NuxtLink>
          <a
            href="https://github.com/yourusername/gestion-decomptes"
            class="text-sm font-semibold leading-6 text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            En savoir plus <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>