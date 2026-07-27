<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import ServiceTimesCard from '@/components/ServiceTimesCard.vue'
</script>

<template>
  <div>
    <HeroSection />
    <ServiceTimesCard />

    <div class="mx-4 mt-8 text-center sm:mx-8 md:mx-16">
      <h2 class="mb-2 text-[var(--color-navy)] text-xl font-semibold md:text-2xl">Welcome</h2>
      <p class="text-gray-600 leading-relaxed md:text-lg">
        We are a community of believers dedicated to knowing Christ and making Him known.
        Whether you're seeking a church home or exploring faith for the first time,
        you are welcome here.
      </p>
      <p class="mt-3 text-sm text-gray-500 md:text-base">Mark 1:15 — "The time is fulfilled, and the kingdom of God is at hand; repent and believe in the gospel."</p>
    </div>

    <footer class="mx-4 mt-12 border-t border-gray-200 py-6 text-center sm:mx-8 md:mx-16">
      <div class="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-map-pin" class="text-[var(--color-navy)] text-sm" />
          <span>Palace Hotel, Harare</span>
        </div>
        <span class="hidden sm:inline text-gray-300">|</span>
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-phone" class="text-[var(--color-navy)] text-sm" />
          <span>+263 77 314 7693</span>
        </div>
        <span class="hidden sm:inline text-gray-300">|</span>
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-clock" class="text-[var(--color-navy)] text-sm" />
          <span>Sunday 9AM & 5PM</span>
        </div>
      </div>
      <p class="mt-3 text-xs text-gray-400">Fountain of Life Family in Christ</p>
    </footer>
  </div>
</template>
