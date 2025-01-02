export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  components: {
    dirs: [
      '~/components',
      '~/components/form',
      '~/components/layout'
    ]
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'default-dev-secret',
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/gestion-decomptes'
  },
  nitro: {
    preset: 'node-server'
  },
  compatibilityDate: '2025-01-01',
  // Disable devtools in production
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  // Add SSR config to help with hydration
  ssr: true,
  experimental: {
    payloadExtraction: false
  }
})