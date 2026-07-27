<script setup lang="ts">
import LocationMap from '@/components/LocationMap.vue'
import ServiceTimesFull from '@/components/ServiceTimesFull.vue'
import ContactInfo from '@/components/ContactInfo.vue'
import BeliefsSection from '@/components/BeliefsSection.vue'
</script>

<template>
  <div class="px-4 py-6 pb-10 sm:px-8 md:px-12">
    <h1 class="mb-1 text-[var(--color-navy)] text-2xl font-bold md:text-3xl">About</h1>
    <p class="mb-6 text-gray-500 md:text-lg">Learn more about our church and community</p>

    <div class="space-y-4">
      <LocationMap />
      <ServiceTimesFull />
      <ContactInfo />
      <BeliefsSection />
    </div>
  </div>
</template>
