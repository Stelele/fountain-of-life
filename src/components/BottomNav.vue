<script setup lang="ts">
const items = [
  { label: 'Home', icon: 'i-lucide-home', to: '/' },
  { label: 'Watch', icon: 'i-lucide-play', to: '/watch' },
  { label: 'Connect', icon: 'i-lucide-message-circle', to: '/connect' },
  { label: 'About', icon: 'i-lucide-info', to: '/about' },
]
</script>

<template>
  <UNavigationMenu
    :items="items"
    orientation="horizontal"
    class="fixed bottom-0 left-0 right-0 z-50 mx-auto justify-around border-t border-gray-200 bg-white px-4 sm:justify-center sm:gap-12 md:gap-20"
    :style="{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }"
  />
</template>
