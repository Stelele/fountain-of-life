import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    vueDevTools(),
    ui({
      ui: {
        colors: {
          primary: 'yellow',
          neutral: 'zinc',
        },
      },
      colorMode: false,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      devOptions: {
        enabled: mode === 'development',
        type: 'module',
      },
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,svg,png,ico,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/i\.ytimg\.com\/.*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'youtube-thumbnails',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/www\.googleapis\.com\/youtube\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'youtube-api',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: ['es2019', 'safari13'],
  },
}))
