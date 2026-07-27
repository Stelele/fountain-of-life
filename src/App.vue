<script setup lang="ts">
import SiteNav from '@/components/SiteNav.vue'
import OfflineBanner from '@/components/OfflineBanner.vue'
import PwaInstallPrompt from '@/components/PwaInstallPrompt.vue'
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <SiteNav />
    <PwaInstallPrompt />
    <OfflineBanner />
    <main class="mx-auto w-full max-w-lg flex-1 pb-24 sm:max-w-2xl sm:pb-28 md:max-w-3xl lg:max-w-5xl lg:pb-8 xl:max-w-6xl">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <div class="h-14 sm:h-16 lg:hidden" />
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
