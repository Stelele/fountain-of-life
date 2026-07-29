<script setup lang="ts">
import { useRoute } from 'vue-router'
import { WHATSAPP_URL, CHURCH_NAME } from '@/data/churchInfo'

const items = [
  { label: 'Home', icon: 'i-lucide-home', to: '/' },
  { label: 'Watch', icon: 'i-lucide-play', to: '/watch' },
  { label: 'Connect', icon: 'i-lucide-message-circle', to: '/connect' },
  { label: 'About', icon: 'i-lucide-info', to: '/about' },
]

const route = useRoute()

function isActive(to: string): boolean {
  return route.path === to
}
</script>

<template>
  <!-- Desktop: top header -->
  <header aria-label="Site header" class="hidden border-b border-default bg-default lg:block">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-8 py-3">
      <router-link to="/" aria-label="Fountain of Life — Home" class="flex items-center gap-3">
        <img src="/logo.png" alt="Fountain of Life Church Logo" class="h-9 w-9" />
        <span class="text-highlighted text-lg font-bold" aria-hidden="true">{{ CHURCH_NAME }}</span>
      </router-link>
      <nav aria-label="Main navigation" class="flex items-center gap-2">
        <UNavigationMenu :items="items" orientation="horizontal" class="gap-1" />
        <UButton
          icon="i-lucide-heart-handshake"
          :to="WHATSAPP_URL"
          target="_blank"
          rel="noopener noreferrer"
          color="secondary"
          size="sm"
          class="ml-2"
        >
          Give
        </UButton>
      </nav>
    </div>
  </header>

  <!-- Mobile: bottom tab bar -->
  <nav
    aria-label="Main navigation"
    class="fixed bottom-0 left-0 right-0 z-40 border-t border-default bg-default lg:hidden"
    :style="{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }"
  >
    <div class="mx-auto flex max-w-lg justify-around">
      <UButton
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        :icon="item.icon"
        variant="ghost"
        :class="isActive(item.to) ? 'text-highlighted' : 'text-muted'"
        class="flex-col gap-0.5 px-2 py-2 min-w-0 text-[11px]"
      >
        {{ item.label }}
      </UButton>
    </div>
  </nav>
</template>
