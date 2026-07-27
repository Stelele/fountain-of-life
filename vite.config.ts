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
          primary: '#1a2a4a',
          secondary: '#c9a84c',
          neutral: '#222222',
        },
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: mode === 'development',
        type: 'module',
        navigateFallback: 'index.html',
      },
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{html,js,css,svg,png,ico,webp,woff2}'],
        navigateFallback: '/index.html',
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
            urlPattern: /^https:\/\/www\.youtube\.com\/feeds\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'youtube-rss',
              expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 },
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
  server: {
    proxy: {
      '/api/youtube-rss': {
        target: 'https://www.youtube.com',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/youtube-rss', '/feeds/videos.xml'),
      },
    },
  },
  build: {
    target: ['es2019', 'safari13'],
  },
}))
