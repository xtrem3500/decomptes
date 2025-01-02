import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        paypal: {
          blue: '#003087',
          lightBlue: '#009cde',
          darkBlue: '#001c64',
          sand: '#f5f7fa',
          white: '#ffffff',
          gray: '#243656',
          lightGray: '#eee'
        }
      },
      borderRadius: {
        'paypal': '1.5rem'
      }
    },
  },
  plugins: [],
} satisfies Config