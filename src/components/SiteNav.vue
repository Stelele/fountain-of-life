<script setup lang="ts">
const items = [
  { label: 'Home', icon: 'i-lucide-home', to: '/' },
  { label: 'Watch', icon: 'i-lucide-play', to: '/watch' },
  { label: 'Connect', icon: 'i-lucide-message-circle', to: '/connect' },
  { label: 'About', icon: 'i-lucide-info', to: '/about' },
]
</script>

<template>
  <!-- Mobile: bottom nav -->
  <UNavigationMenu
    :items="items"
    orientation="horizontal"
    class="fixed bottom-0 left-0 right-0 z-50 mx-auto justify-around border-t border-gray-200 bg-white px-4 sm:justify-center sm:gap-12 lg:hidden"
    :style="{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }"
  />

  <!-- Desktop: top header -->
  <header class="hidden lg:block border-b border-gray-200 bg-white">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-8 py-3">
      <router-link to="/" class="flex items-center gap-3">
        <svg class="h-9 w-9" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="56" fill="#1a2a4a" stroke="#c9a84c" stroke-width="4" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.6" />
          <g transform="translate(60,44)">
            <line x1="0" y1="-22" x2="0" y2="18" stroke="#cc3333" stroke-width="6" stroke-linecap="round" />
            <line x1="-13" y1="-7" x2="13" y2="-7" stroke="#cc3333" stroke-width="6" stroke-linecap="round" />
          </g>
          <g transform="translate(60,68)">
            <path d="M-15,0 Q-10,-18 0,-15 Q10,-18 15,0" fill="none" stroke="#00a8cc" stroke-width="3" />
            <path d="M-25,3 Q-12,-8 0,-5 Q12,-8 25,3" fill="none" stroke="#7ec8e3" stroke-width="2.5" opacity="0.8" />
          </g>
        </svg>
        <span class="text-[var(--color-navy)] text-lg font-bold">Fountain of Life</span>
      </router-link>
      <UNavigationMenu :items="items" orientation="horizontal" class="gap-1" />
    </div>
  </header>
</template>
