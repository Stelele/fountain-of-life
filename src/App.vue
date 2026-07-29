<script setup lang="ts">
import SiteNav from '@/components/SiteNav.vue'
import OfflineBanner from '@/components/OfflineBanner.vue'
import PwaInstallPrompt from '@/components/PwaInstallPrompt.vue'
import FloatingWhatsApp from '@/components/FloatingWhatsApp.vue'
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-primary-900 focus:px-4 focus:py-2 focus:text-inverted"
    >
      Skip to content
    </a>
    <SiteNav />
    <FloatingWhatsApp />
    <PwaInstallPrompt />
    <OfflineBanner />
    <main id="main-content" class="flex-1 pb-24 sm:pb-28 lg:pb-8">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
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
