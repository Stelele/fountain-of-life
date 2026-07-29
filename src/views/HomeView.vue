<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import ServiceTimesCard from '@/components/ServiceTimesCard.vue'
import WelcomeSection from '@/components/WelcomeSection.vue'
import VisitorCardModal from '@/components/VisitorCardModal.vue'
import AboutApostleSection from '@/components/AboutApostleSection.vue'
import EventsSection from '@/components/EventsSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import GiveSection from '@/components/GiveSection.vue'
import NewsletterSection from '@/components/NewsletterSection.vue'
import ClosingBanner from '@/components/ClosingBanner.vue'
import AppFooter from '@/components/AppFooter.vue'
const showVisitorForm = ref(false)
</script>

<template>
  <div>
    <HeroSection />
    <ServiceTimesCard />

    <WelcomeSection @open-visitor="showVisitorForm = true" />
    <AboutApostleSection />
    <EventsSection />
    <TestimonialsSection />
    <GiveSection />
    <NewsletterSection />
    <ClosingBanner />
    <AppFooter />

    <VisitorCardModal v-model:open="showVisitorForm" />
  </div>
</template>
