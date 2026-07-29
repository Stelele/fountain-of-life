<script setup lang="ts">
import LocationMap from '@/components/LocationMap.vue'
import ServiceTimesFull from '@/components/ServiceTimesFull.vue'
import ContactInfo from '@/components/ContactInfo.vue'
import BeliefsSection from '@/components/BeliefsSection.vue'
</script>

<template>
  <UPage>
    <UPageHeader
      title="About"
      description="Learn more about our church and community"
    />
    <UPageBody>
      <div class="space-y-4">
        <LocationMap />
        <ServiceTimesFull />
        <ContactInfo />
        <BeliefsSection />
      </div>
    </UPageBody>
  </UPage>
</template>
