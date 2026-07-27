# Fountain of Life Website — Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first PWA for Fountain of Life Church with bottom-tab navigation (Home/Watch/Connect/About), YouTube video aggregation, Facebook embed, and offline support — all as a static Vue 3 SPA with Nuxt UI v4.

**Architecture:** Vue 3 SPA with Vue Router (hash history), Nuxt UI v4 as Vue plugin, vite-plugin-pwa for offline/install. YouTube uses RSS feed for latest videos + Data API for back catalogue on "Load More". Facebook via Page Plugin iframe. No backend.

**Tech Stack:** Vue 3, Vite, TypeScript, Nuxt UI v4, Tailwind v4, Vue Router 4, vite-plugin-pwa (Workbox)

---

## Phase 1: Project Setup

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove unused Pinia dependency**

```bash
rm src/stores/counter.ts
```

- [ ] **Step 2: Install new dependencies**

```bash
npm install @nuxt/ui @iconify-json/lucide
npm install -D vite-plugin-pwa
```

Expected: Dependencies added to `package.json`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git rm src/stores/counter.ts
git commit -m "chore: add @nuxt/ui, @iconify-json/lucide, vite-plugin-pwa; remove Pinia counter store"
```

---

### Task 2: Configure Vite with Nuxt UI and PWA

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Replace `vite.config.ts`**

```typescript
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
  build: {
    target: ['es2019', 'safari13'],
  },
}))
```

- [ ] **Step 2: Commit**

```bash
git add vite.config.ts
git commit -m "chore: configure @nuxt/ui/vite and vite-plugin-pwa"
```

---

### Task 3: Set up global CSS and Nuxt UI styles

**Files:**
- Replace: `src/style.css`

Note: The current project has no `src/style.css` — Tailwind v4 and Nuxt UI are imported via CSS imports.

- [ ] **Step 1: Create `src/style.css`**

```css
@import 'tailwindcss';
@import '@nuxt/ui';

@theme {
  --color-navy: #1a2a4a;
  --color-teal: #0077aa;
  --color-cyan: #00a8cc;
  --color-sky: #7ec8e3;
  --color-gold: #c9a84c;
  --color-cream: #f5f0e1;
}

body {
  background-color: #ffffff;
  color: #222222;
  overscroll-behavior: none;
}

#app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.hero-gradient {
  background: linear-gradient(135deg, #1a2a4a 0%, #0077aa 40%, #00a8cc 70%, #7ec8e3 100%);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/style.css
git commit -m "feat: add Tailwind v4 CSS with church color tokens and hero gradient"
```

---

### Task 4: Update HTML with PWA meta tags

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#1a2a4a">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Fountain of Life">
    <link rel="apple-touch-icon" href="/favicon.ico">
    <link rel="manifest" href="/manifest.webmanifest">
    <title>Fountain of Life</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add PWA meta tags, iOS support, and church branding to HTML"
```

---

### Task 5: Create static PWA manifest

**Files:**
- Create: `public/manifest.webmanifest`

- [ ] **Step 1: Create `public/manifest.webmanifest`**

```json
{
  "name": "Fountain of Life Church",
  "short_name": "Fountain of Life",
  "description": "Fountain of Life Church — sermons, updates, and community",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#1a2a4a",
  "icons": [
    {
      "src": "/favicon.ico",
      "sizes": "48x48",
      "type": "image/x-icon"
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add public/manifest.webmanifest
git commit -m "feat: add static PWA manifest"
```

---

### Task 6: Update `main.ts` with Nuxt UI plugin

**Files:**
- Modify: `src/main.ts`

- [ ] **Step 1: Replace `src/main.ts`**

```typescript
import './style.css'
import { createApp } from 'vue'
import ui from '@nuxt/ui/vue-plugin'
import { addCollection } from '@iconify/vue'
import lucide from '@iconify-json/lucide/icons.json'
import App from './App.vue'
import router from './router'

addCollection(lucide)

const app = createApp(App)
app.use(router)
app.use(ui)
app.mount('#app')
```

- [ ] **Step 2: Commit**

```bash
git add src/main.ts
git commit -m "feat: add Nuxt UI vue-plugin and Lucide icons to app bootstrap"
```

---

## Phase 2: Core Layout

### Task 7: Define TypeScript types

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Create `src/types/index.ts`**

```typescript
export interface Video {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  url: string
}

export interface ServiceTime {
  day: string
  time: string
  description: string
}

export interface ChurchInfo {
  name: string
  tagline: string
  address: string
  phone: string
  email: string
  facebookUrl: string
  youtubeChannelId: string
  serviceTimes: ServiceTime[]
  beliefsTitle: string
  beliefsBody: string
}
```

- [ ] **Step 2: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: define Video, ServiceTime, and ChurchInfo TypeScript types"
```

---

### Task 8: Set up Vue Router with hash history

**Files:**
- Modify: `src/router/index.ts`

- [ ] **Step 1: Replace `src/router/index.ts`**

```typescript
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/watch',
      name: 'watch',
      component: () => import('@/views/WatchView.vue'),
    },
    {
      path: '/connect',
      name: 'connect',
      component: () => import('@/views/ConnectView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
```

- [ ] **Step 2: Commit**

```bash
git add src/router/index.ts
git commit -m "feat: configure Vue Router with hash history and 4 lazy-loaded routes"
```

---

### Task 9: Build BottomNav component

**Files:**
- Create: `src/components/BottomNav.vue`

- [ ] **Step 1: Create `src/components/BottomNav.vue`**

```vue
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  { label: 'Home', icon: 'i-lucide-home', to: '/' },
  { label: 'Watch', icon: 'i-lucide-play', to: '/watch' },
  { label: 'Connect', icon: 'i-lucide-message-circle', to: '/connect' },
  { label: 'About', icon: 'i-lucide-info', to: '/about' },
]
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white safe-area-bottom">
    <div class="mx-auto flex max-w-lg items-center justify-around">
      <UNavigationMenu :items="items" />
    </div>
  </nav>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BottomNav.vue
git commit -m "feat: add BottomNav component with 4-tab UNavigationMenu"
```

---

### Task 10: Build OfflineBanner component

**Files:**
- Create: `src/components/OfflineBanner.vue`
- Create: `src/composables/useOffline.ts`

- [ ] **Step 1: Create `src/composables/useOffline.ts`**

```typescript
import { ref, onMounted, onUnmounted } from 'vue'

export function useOffline() {
  const isOffline = ref(!navigator.onLine)

  function onOnline() {
    isOffline.value = false
  }

  function onOffline() {
    isOffline.value = true
  }

  onMounted(() => {
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
  })

  onUnmounted(() => {
    window.removeEventListener('online', onOnline)
    window.removeEventListener('offline', onOffline)
  })

  return { isOffline }
}
```

- [ ] **Step 2: Create `src/components/OfflineBanner.vue`**

```vue
<script setup lang="ts">
import { useOffline } from '@/composables/useOffline'

const { isOffline } = useOffline()
</script>

<template>
  <UAlert
    v-if="isOffline"
    title="You're offline"
    description="Showing cached content. Some features may be unavailable."
    icon="i-lucide-wifi-off"
    color="warning"
    :close-button="{ icon: 'i-lucide-x' }"
    class="mx-4 mt-2"
  />
</template>
```

- [ ] **Step 3: Commit**

```bash
git add src/composables/useOffline.ts src/components/OfflineBanner.vue
git commit -m "feat: add offline detection composable and OfflineBanner alert component"
```

---

### Task 11: Build App.vue shell

**Files:**
- Modify: `src/App.vue`
- Create: `src/views/HomeView.vue` (stub)
- Create: `src/views/WatchView.vue` (stub)
- Create: `src/views/ConnectView.vue` (stub)
- Create: `src/views/AboutView.vue` (stub)

- [ ] **Step 1: Create `src/views/HomeView.vue` (stub)**

```vue
<template>
  <div>Home</div>
</template>
```

- [ ] **Step 2: Create `src/views/WatchView.vue` (stub)**

```vue
<template>
  <div>Watch</div>
</template>
```

- [ ] **Step 3: Create `src/views/ConnectView.vue` (stub)**

```vue
<template>
  <div>Connect</div>
</template>
```

- [ ] **Step 4: Create `src/views/AboutView.vue` (stub)**

```vue
<template>
  <div>About</div>
</template>
```

- [ ] **Step 5: Replace `src/App.vue`**

```vue
<script setup lang="ts">
import BottomNav from '@/components/BottomNav.vue'
import OfflineBanner from '@/components/OfflineBanner.vue'
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <OfflineBanner />
    <main class="flex-1 pb-20">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <BottomNav />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
```

- [ ] **Step 6: Verify the app runs**

```bash
npm run dev
```

Expected: App starts on localhost, shows "Home" with bottom nav visible. Tapping tabs switches between stub pages.

- [ ] **Step 7: Commit**

```bash
git add src/App.vue src/views/
git commit -m "feat: add App shell with router-view transitions, BottomNav, and OfflineBanner"
```

---

## Phase 3: Home Tab

### Task 12: Build HeroSection component

**Files:**
- Create: `src/components/HeroSection.vue`

- [ ] **Step 1: Create `src/components/HeroSection.vue`**

```vue
<template>
  <div class="hero-gradient flex flex-col items-center justify-center px-6 py-16 text-center">
    <div class="mb-4 text-6xl">
      💧
    </div>
    <h1 class="mb-2 text-white text-3xl font-bold">
      Fountain of Life
    </h1>
    <p class="text-sky max-w-md text-lg">
      A place of worship, community, and spiritual growth
    </p>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.vue
git commit -m "feat: add HeroSection with watercolor gradient background"
```

---

### Task 13: Build ServiceTimesCard component

**Files:**
- Create: `src/components/ServiceTimesCard.vue`

- [ ] **Step 1: Create `src/components/ServiceTimesCard.vue`**

```vue
<script setup lang="ts">
const serviceTimes = [
  { day: 'Sunday', time: '9:00 AM', description: 'Morning Worship Service' },
  { day: 'Sunday', time: '5:00 PM', description: 'Evening Service' },
  { day: 'Wednesday', time: '6:00 PM', description: 'Midweek Bible Study' },
]
</script>

<template>
  <UCard class="mx-4 -mt-8 relative z-10">
    <template #header>
      <h2 class="text-navy text-lg font-semibold">Service Times</h2>
    </template>

    <div class="divide-y divide-gray-100">
      <div
        v-for="service in serviceTimes"
        :key="service.day + service.time"
        class="flex items-center justify-between py-3 first:pt-0 last:pb-0"
      >
        <div>
          <p class="text-navy font-medium">{{ service.day }}</p>
          <p class="text-sm text-gray-500">{{ service.description }}</p>
        </div>
        <UBadge color="primary" variant="subtle">
          {{ service.time }}
        </UBadge>
      </div>
    </div>
  </UCard>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ServiceTimesCard.vue
git commit -m "feat: add ServiceTimesCard with schedule display"
```

---

### Task 14: Build HomeView page

**Files:**
- Modify: `src/views/HomeView.vue`

- [ ] **Step 1: Replace `src/views/HomeView.vue`**

```vue
<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import ServiceTimesCard from '@/components/ServiceTimesCard.vue'
</script>

<template>
  <div>
    <HeroSection />
    <ServiceTimesCard />
  </div>
</template>
```

- [ ] **Step 2: Verify visually**

```bash
npm run dev
```

Expected: Home tab shows the hero gradient with "Fountain of Life" title and the service times card below.

- [ ] **Step 3: Commit**

```bash
git add src/views/HomeView.vue
git commit -m "feat: compose HomeView with HeroSection and ServiceTimesCard"
```

---

## Phase 4: Watch Tab

### Task 15: Build useYouTube composable

**Files:**
- Create: `src/composables/useYouTube.ts`

- [ ] **Step 1: Create `src/composables/useYouTube.ts`**

```typescript
import { ref } from 'vue'
import type { Video } from '@/types'

const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCOAoHXW3nCre1EACIn-soIQ'
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || ''

const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`

function xmlToVideos(xml: string): Video[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const entries = doc.querySelectorAll('entry')

  return Array.from(entries).map((entry) => {
    const id = entry.querySelector('yt\\:videoId')?.textContent || ''
    const title = entry.querySelector('title')?.textContent || ''
    const publishedAt = entry.querySelector('published')?.textContent || ''
    const url = entry.querySelector('link')?.getAttribute('href') || ''
    const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

    return { id, title, thumbnail, publishedAt, url }
  })
}

export function useYouTube() {
  const videos = ref<Video[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref<string | null>(null)
  const nextPageToken = ref<string | null>(null)
  const hasMore = ref(false)
  const rssLoaded = ref(false)

  async function fetchRSS(): Promise<void> {
    if (rssLoaded.value) return
    loading.value = true
    error.value = null

    try {
      const response = await fetch(RSS_URL)
      if (!response.ok) throw new Error('RSS feed unavailable')
      const xml = await response.text()
      const rssVideos = xmlToVideos(xml)
      videos.value = rssVideos
      rssLoaded.value = true

      if (YOUTUBE_API_KEY) {
        hasMore.value = true
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load videos'
    } finally {
      loading.value = false
    }
  }

  async function loadMore(): Promise<void> {
    if (!YOUTUBE_API_KEY || loadingMore.value) return
    loadingMore.value = true

    try {
      const uploadsPlaylistId = YOUTUBE_CHANNEL_ID.replace(/^UC/, 'UU')
      let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`
      if (nextPageToken.value) {
        url += `&pageToken=${nextPageToken.value}`
      }

      const response = await fetch(url)
      if (!response.ok) throw new Error('API quota exceeded')

      const data = await response.json()
      nextPageToken.value = data.nextPageToken || null
      hasMore.value = !!data.nextPageToken

      const apiVideos: Video[] = data.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
        publishedAt: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      }))

      const existingIds = new Set(videos.value.map((v) => v.id))
      const newVideos = apiVideos.filter((v: Video) => !existingIds.has(v.id))
      videos.value = [...videos.value, ...newVideos]
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load more videos'
    } finally {
      loadingMore.value = false
    }
  }

  return { videos, loading, loadingMore, error, hasMore, fetchRSS, loadMore }
}
```

- [ ] **Step 2: Create `src/env.d.ts` for environment variable types**

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_YOUTUBE_API_KEY: string
  readonly VITE_YOUTUBE_CHANNEL_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

The `env.d.ts` file exists in the project root. Check its current content and add if needed.

- [ ] **Step 3: Commit**

```bash
git add src/composables/useYouTube.ts
git commit -m "feat: add useYouTube composable with RSS parsing and Data API pagination"
```

---

### Task 16: Build VideoCard component

**Files:**
- Create: `src/components/VideoCard.vue`

- [ ] **Step 1: Create `src/components/VideoCard.vue`**

```vue
<script setup lang="ts">
import type { Video } from '@/types'

defineProps<{
  video: Video
}>()

defineEmits<{
  select: [video: Video]
}>()

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<template>
  <UCard
    class="cursor-pointer overflow-hidden transition-transform hover:scale-[1.02]"
    :ui="{ body: 'p-0', header: 'p-0' }"
    @click="$emit('select', video)"
  >
    <div class="relative aspect-video w-full overflow-hidden bg-gray-100">
      <img
        :src="video.thumbnail"
        :alt="video.title"
        class="h-full w-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
        <UIcon name="i-lucide-play-circle" class="text-white text-5xl" />
      </div>
    </div>
    <div class="p-3">
      <p class="text-navy line-clamp-2 text-sm font-medium">{{ video.title }}</p>
      <p class="mt-1 text-xs text-gray-500">{{ formatDate(video.publishedAt) }}</p>
    </div>
  </UCard>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VideoCard.vue
git commit -m "feat: add VideoCard with thumbnail, title, date, and play overlay"
```

---

### Task 17: Build VideoPlayer modal component

**Files:**
- Create: `src/components/VideoPlayer.vue`

- [ ] **Step 1: Create `src/components/VideoPlayer.vue`**

```vue
<script setup lang="ts">
import type { Video } from '@/types'

defineProps<{
  video: Video | null
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <UModal :open="video !== null" @update:open="$emit('close')">
    <template #body>
      <div v-if="video" class="aspect-video w-full">
        <iframe
          :src="`https://www.youtube.com/embed/${video.id}?autoplay=1`"
          class="h-full w-full"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        />
      </div>
    </template>
  </UModal>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VideoPlayer.vue
git commit -m "feat: add VideoPlayer modal with YouTube iframe embed"
```

---

### Task 18: Build VideoGrid component

**Files:**
- Create: `src/components/VideoGrid.vue`

- [ ] **Step 1: Create `src/components/VideoGrid.vue`**

```vue
<script setup lang="ts">
import type { Video } from '@/types'
import VideoCard from '@/components/VideoCard.vue'

defineProps<{
  videos: Video[]
  loading: boolean
  loadingMore: boolean
  error: string | null
  hasMore: boolean
}>()

defineEmits<{
  select: [video: Video]
  loadMore: []
}>()
</script>

<template>
  <div>
    <div v-if="loading" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div v-for="n in 4" :key="n">
        <UCard :ui="{ body: 'p-0', header: 'p-0' }">
          <div class="aspect-video w-full bg-gray-200" />
          <div class="space-y-2 p-3">
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-3 w-1/3" />
          </div>
        </UCard>
      </div>
    </div>

    <div v-else-if="error" class="flex flex-col items-center gap-3 py-12 text-center">
      <UIcon name="i-lucide-alert-circle" class="text-4xl text-gray-400" />
      <p class="text-gray-500">Videos temporarily unavailable</p>
      <UButton variant="outline" @click="$emit('loadMore')">Retry</UButton>
    </div>

    <div v-else-if="videos.length === 0" class="flex flex-col items-center gap-3 py-12 text-center">
      <UIcon name="i-lucide-video-off" class="text-4xl text-gray-400" />
      <p class="text-gray-500">Check back soon for new videos</p>
    </div>

    <template v-else>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <VideoCard
          v-for="video in videos"
          :key="video.id"
          :video="video"
          @select="$emit('select', video)"
        />
      </div>

      <div v-if="hasMore" class="mt-6 flex justify-center">
        <UButton
          variant="outline"
          :loading="loadingMore"
          @click="$emit('loadMore')"
        >
          Load More
        </UButton>
      </div>
    </template>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VideoGrid.vue
git commit -m "feat: add VideoGrid with skeleton, error, empty, and load-more states"
```

---

### Task 19: Build useNewVideosAlert composable

**Files:**
- Create: `src/composables/useNewVideosAlert.ts`

- [ ] **Step 1: Create `src/composables/useNewVideosAlert.ts`**

```typescript
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'fountain_last_seen_video_id'
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCOAoHXW3nCre1EACIn-soIQ'}`

export function useNewVideosAlert() {
  const newVideoCount = ref(0)

  async function checkForNewVideos(): Promise<void> {
    try {
      const response = await fetch(RSS_URL)
      const xml = await response.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(xml, 'text/xml')
      const firstEntry = doc.querySelector('entry')
      const latestId = firstEntry?.querySelector('yt\\:videoId')?.textContent

      if (!latestId) return

      const lastSeenId = localStorage.getItem(STORAGE_KEY)
      if (!lastSeenId) {
        localStorage.setItem(STORAGE_KEY, latestId)
        return
      }

      if (latestId !== lastSeenId) {
        const entries = doc.querySelectorAll('entry')
        let count = 0
        for (const entry of entries) {
          const id = entry.querySelector('yt\\:videoId')?.textContent
          if (id === lastSeenId) break
          count++
        }
        newVideoCount.value = count
      }
    } catch {
      // Silently fail — RSS is unavailable, don't bother the user
    }
  }

  function markLatestSeen(): void {
    newVideoCount.value = 0
    const parser = new DOMParser()
    fetch(RSS_URL)
      .then((r) => r.text())
      .then((xml) => {
        const doc = parser.parseFromString(xml, 'text/xml')
        const firstEntry = doc.querySelector('entry')
        const latestId = firstEntry?.querySelector('yt\\:videoId')?.textContent
        if (latestId) localStorage.setItem(STORAGE_KEY, latestId)
      })
      .catch(() => {})
  }

  onMounted(() => {
    checkForNewVideos()
  })

  return { newVideoCount, markLatestSeen }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/composables/useNewVideosAlert.ts
git commit -m "feat: add useNewVideosAlert composable — detects new videos via localStorage"
```

---

### Task 20: Build WatchView page

**Files:**
- Modify: `src/views/WatchView.vue`

- [ ] **Step 1: Replace `src/views/WatchView.vue`**

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Video } from '@/types'
import { useYouTube } from '@/composables/useYouTube'
import { useNewVideosAlert } from '@/composables/useNewVideosAlert'
import VideoGrid from '@/components/VideoGrid.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

const { videos, loading, loadingMore, error, hasMore, fetchRSS, loadMore } = useYouTube()
const { newVideoCount, markLatestSeen } = useNewVideosAlert()
const selectedVideo = ref<Video | null>(null)

onMounted(async () => {
  await fetchRSS()
  markLatestSeen()
})

function onSelect(video: Video) {
  selectedVideo.value = video
}

function onClosePlayer() {
  selectedVideo.value = null
}
</script>

<template>
  <div class="px-4 py-6">
    <h1 class="mb-1 text-navy text-2xl font-bold">Watch</h1>
    <p class="mb-6 text-gray-500">Sermons, worship, and messages</p>

    <UAlert
      v-if="newVideoCount > 0"
      icon="i-lucide-video"
      :title="`${newVideoCount} new ${newVideoCount === 1 ? 'video' : 'videos'} available`"
      description="Check out the latest sermons"
      color="info"
      class="mb-4"
      :close-button="{ icon: 'i-lucide-x', onClick: () => (newVideoCount = 0) }"
    />

    <VideoGrid
      :videos="videos"
      :loading="loading"
      :loading-more="loadingMore"
      :error="error"
      :has-more="hasMore"
      @select="onSelect"
      @load-more="loadMore"
    />

    <VideoPlayer
      :video="selectedVideo"
      @close="onClosePlayer"
    />
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/WatchView.vue
git commit -m "feat: compose WatchView with VideoGrid, VideoPlayer, and new videos alert"
```

---

## Phase 5: Connect Tab

### Task 21: Build FacebookFeed component

**Files:**
- Create: `src/components/FacebookFeed.vue`

- [ ] **Step 1: Create `src/components/FacebookFeed.vue`**

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const FACEBOOK_URL = 'https://www.facebook.com/share/14ngyaWEezU/'
const iframeLoaded = ref(false)
const iframeFailed = ref(false)

onMounted(() => {
  setTimeout(() => {
    if (!iframeLoaded.value) {
      iframeFailed.value = true
    }
  }, 5000)
})
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-navy text-lg font-semibold">Facebook Updates</h2>
    </template>

    <div v-if="iframeFailed" class="flex flex-col items-center gap-4 py-8 text-center">
      <UIcon name="i-lucide-external-link" class="text-4xl text-gray-400" />
      <p class="text-gray-500">Facebook feed could not be loaded</p>
      <UButton
        icon="i-lucide-external-link"
        :to="FACEBOOK_URL"
        target="_blank"
      >
        Follow us on Facebook
      </UButton>
    </div>

    <div v-else class="relative">
      <div v-if="!iframeLoaded" class="flex justify-center py-8">
        <UIcon name="i-lucide-loader-circle" class="animate-spin text-2xl text-gray-400" />
      </div>
      <iframe
        :src="`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_URL)}&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`"
        width="340"
        height="500"
        class="w-full border-none"
        scrolling="no"
        frameborder="0"
        allow="encrypted-media"
        @load="iframeLoaded = true"
      />
    </div>
  </UCard>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FacebookFeed.vue
git commit -m "feat: add FacebookFeed with Page Plugin iframe and blocked fallback"
```

---

### Task 22: Build ConnectView page

**Files:**
- Modify: `src/views/ConnectView.vue`

- [ ] **Step 1: Replace `src/views/ConnectView.vue`**

```vue
<script setup lang="ts">
import FacebookFeed from '@/components/FacebookFeed.vue'
</script>

<template>
  <div class="px-4 py-6">
    <h1 class="mb-1 text-navy text-2xl font-bold">Connect</h1>
    <p class="mb-6 text-gray-500">Stay up to date with our community</p>

    <FacebookFeed />
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/ConnectView.vue
git commit -m "feat: compose ConnectView with FacebookFeed"
```

---

## Phase 6: About Tab

### Task 23: Build About section components

**Files:**
- Create: `src/components/LocationMap.vue`
- Create: `src/components/ServiceTimesFull.vue`
- Create: `src/components/ContactInfo.vue`

- [ ] **Step 1: Create `src/components/LocationMap.vue`**

```vue
<template>
  <UCard>
    <template #header>
      <h2 class="text-navy text-lg font-semibold">Location</h2>
    </template>
    <div class="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=30.95,-17.85,31.05,-17.75&layer=mapnik"
        width="100%"
        height="100%"
        class="border-none"
        loading="lazy"
        title="Church location map"
      />
    </div>
    <p class="mt-3 text-sm text-gray-500">123 Faith Avenue, Harare, Zimbabwe</p>
  </UCard>
</template>
```

- [ ] **Step 2: Create `src/components/ServiceTimesFull.vue`**

```vue
<script setup lang="ts">
const serviceTimes = [
  { day: 'Sunday', time: '9:00 AM', description: 'Morning Worship Service' },
  { day: 'Sunday', time: '5:00 PM', description: 'Evening Service' },
  { day: 'Wednesday', time: '6:00 PM', description: 'Midweek Bible Study' },
  { day: 'Friday', time: '6:00 PM', description: 'Prayer Meeting' },
]
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-navy text-lg font-semibold">Service Times</h2>
    </template>
    <UTable :rows="serviceTimes" :columns="[
      { key: 'day', label: 'Day' },
      { key: 'time', label: 'Time' },
      { key: 'description', label: 'Service' },
    ]" />
  </UCard>
</template>
```

- [ ] **Step 3: Create `src/components/ContactInfo.vue`**

```vue
<template>
  <UCard>
    <template #header>
      <h2 class="text-navy text-lg font-semibold">Contact Us</h2>
    </template>
    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-map-pin" class="text-navy text-xl" />
        <span class="text-sm">123 Faith Avenue, Harare, Zimbabwe</span>
      </div>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-phone" class="text-navy text-xl" />
        <a href="tel:+263771234567" class="text-sm text-cyan hover:underline">+263 77 123 4567</a>
      </div>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-mail" class="text-navy text-xl" />
        <a href="mailto:info@fountainoflife.org" class="text-sm text-cyan hover:underline">info@fountainoflife.org</a>
      </div>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-facebook" class="text-navy text-xl" />
        <a
          href="https://www.facebook.com/share/14ngyaWEezU/"
          target="_blank"
          class="text-sm text-cyan hover:underline"
        >
          Facebook Page
        </a>
      </div>
    </div>
  </UCard>
</template>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/LocationMap.vue src/components/ServiceTimesFull.vue src/components/ContactInfo.vue
git commit -m "feat: add LocationMap, ServiceTimesFull, and ContactInfo components"
```

---

### Task 24: Build BeliefsSection component

**Files:**
- Create: `src/components/BeliefsSection.vue`

- [ ] **Step 1: Create `src/components/BeliefsSection.vue`**

```vue
<template>
  <UCard>
    <template #header>
      <h2 class="text-navy text-lg font-semibold">What We Believe</h2>
    </template>

    <div class="space-y-4 text-sm leading-relaxed text-gray-700">
      <p>
        We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.
      </p>
      <p>
        We believe the Bible is the inspired and authoritative Word of God, our guide for faith
        and daily living.
      </p>
      <p>
        We believe in the deity of our Lord Jesus Christ, His virgin birth, His sinless life,
        His atoning death on the cross, His bodily resurrection, and His coming return.
      </p>
      <p>
        We believe that all have sinned and fall short of the glory of God, and that salvation
        is found only through faith in Jesus Christ.
      </p>

      <USeparator />

      <div>
        <h3 class="mb-2 font-semibold text-navy">Our Vision</h3>
        <p>
          To be a fountain of living water — a community where lives are transformed by the love
          of Christ, where believers grow in faith, and where we reach out with compassion to our
          city and beyond.
        </p>
      </div>
    </div>
  </UCard>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BeliefsSection.vue
git commit -m "feat: add BeliefsSection with statement of faith and vision"
```

---

### Task 25: Build AboutView page

**Files:**
- Modify: `src/views/AboutView.vue`

- [ ] **Step 1: Replace `src/views/AboutView.vue`**

```vue
<script setup lang="ts">
import LocationMap from '@/components/LocationMap.vue'
import ServiceTimesFull from '@/components/ServiceTimesFull.vue'
import ContactInfo from '@/components/ContactInfo.vue'
import BeliefsSection from '@/components/BeliefsSection.vue'
</script>

<template>
  <div class="px-4 py-6">
    <h1 class="mb-1 text-navy text-2xl font-bold">About</h1>
    <p class="mb-6 text-gray-500">Learn more about our church and community</p>

    <div class="space-y-4">
      <LocationMap />
      <ServiceTimesFull />
      <ContactInfo />
      <BeliefsSection />
    </div>
  </div>
</template>
```

- [ ] **Step 2: Verify visually**

```bash
npm run dev
```

Expected: All 4 tabs render correctly. Home shows hero and service times. Watch shows skeleton then video grid (if RSS works). Connect shows Facebook iframe. About shows all 4 section cards.

- [ ] **Step 3: Commit**

```bash
git add src/views/AboutView.vue
git commit -m "feat: compose AboutView with LocationMap, ServiceTimesFull, ContactInfo, and BeliefsSection"
```

---

## Phase 7: PWA & Polish

### Task 26: Build PwaInstallPrompt component

**Files:**
- Create: `src/composables/usePwaInstall.ts`
- Create: `src/components/PwaInstallPrompt.vue`

- [ ] **Step 1: Create `src/composables/usePwaInstall.ts`**

```typescript
import { ref, onMounted } from 'vue'

export function usePwaInstall() {
  const deferredPrompt = ref<any>(null)
  const isInstallable = ref(false)
  const isIOS = ref(false)

  onMounted(() => {
    const ua = navigator.userAgent || ''
    isIOS.value = /iPad|iPhone|iPod/.test(ua)

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault()
      deferredPrompt.value = e
      isInstallable.value = true
    })
  })

  async function install(): Promise<void> {
    if (deferredPrompt.value) {
      deferredPrompt.value.prompt()
      const { outcome } = await deferredPrompt.value.userChoice
      deferredPrompt.value = null
      isInstallable.value = false
      return outcome
    }
  }

  return { isInstallable, isIOS, install }
}
```

- [ ] **Step 2: Create `src/components/PwaInstallPrompt.vue`**

```vue
<script setup lang="ts">
import { usePwaInstall } from '@/composables/usePwaInstall'

const { isInstallable, isIOS, install } = usePwaInstall()
</script>

<template>
  <div v-if="isIOS" class="mx-4 mt-2">
    <UAlert
      title="Install this app"
      description="Tap the Share button and select 'Add to Home Screen' to install Fountain of Life on your device."
      icon="i-lucide-download"
      color="primary"
      :close-button="{ icon: 'i-lucide-x' }"
    />
  </div>

  <UToast
    v-if="isInstallable"
    title="Install App"
    description="Add Fountain of Life to your home screen for quick access"
    icon="i-lucide-download"
    :timeout="30000"
    :actions="[{ label: 'Install', onClick: install }]"
  />
</template>
```

- [ ] **Step 3: Commit**

```bash
git add src/composables/usePwaInstall.ts src/components/PwaInstallPrompt.vue
git commit -m "feat: add PWA install prompt for Android (beforeinstallprompt) and iOS instructions"
```

---

### Task 27: Integrate PWA components into App.vue

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: Replace `src/App.vue`**

```vue
<script setup lang="ts">
import BottomNav from '@/components/BottomNav.vue'
import OfflineBanner from '@/components/OfflineBanner.vue'
import PwaInstallPrompt from '@/components/PwaInstallPrompt.vue'
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <PwaInstallPrompt />
    <OfflineBanner />
    <main class="flex-1 pb-20">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <BottomNav />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
```

- [ ] **Step 2: Final verification**

```bash
npm run dev
```

Expected: All tabs working. Bottom nav functional. Page transitions working. Offline banner shows when network disconnected.

- [ ] **Step 3: Build check**

```bash
npm run build
```

Expected: Build succeeds with no errors. Output in `dist/`.

- [ ] **Step 4: Commit**

```bash
git add src/App.vue
git commit -m "feat: integrate PwaInstallPrompt, OfflineBanner, BottomNav into App shell"
```

---

## Phase 8: Final Polish

### Task 28: Add .env.example and verify

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Create `.env.example`**

```
VITE_YOUTUBE_API_KEY=your-youtube-data-api-v3-key
VITE_YOUTUBE_CHANNEL_ID=UCOAoHXW3nCre1EACIn-soIQ
```

- [ ] **Step 2: Final build**

```bash
npm run build
```

Expected: Build succeeds. Check `dist/` contains `sw.js` and `manifest.webmanifest`.

- [ ] **Step 3: Commit final state**

```bash
git add .env.example
git commit -m "chore: add .env.example with environment variable documentation"
```
