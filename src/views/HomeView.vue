<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import ServiceTimesCard from '@/components/ServiceTimesCard.vue'
import EventsSection from '@/components/EventsSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import GiveSection from '@/components/GiveSection.vue'
import NewsletterSection from '@/components/NewsletterSection.vue'
import AppFooter from '@/components/AppFooter.vue'
import { CHURCH_SCRIPTURE } from '@/data/churchInfo'
</script>

<template>
  <div>
    <HeroSection />
    <ServiceTimesCard />

    <UPageBody class="mt-8 text-center">
      <h2 class="mb-2 text-navy text-xl font-semibold md:text-2xl">Welcome</h2>
      <p class="text-neutral-500 leading-relaxed md:text-lg">
        We are a community of believers dedicated to knowing Christ and making Him known.
        Whether you're seeking a church home or exploring faith for the first time,
        you are welcome here.
      </p>
      <p class="mt-3 text-sm text-neutral-500 md:text-base">
        {{ CHURCH_SCRIPTURE }} — "The time is fulfilled, and the kingdom of God is at hand; repent and believe in the gospel."
      </p>
    </UPageBody>

    <EventsSection />
    <TestimonialsSection />
    <GiveSection />
    <NewsletterSection />
    <AppFooter />
  </div>
</template>
