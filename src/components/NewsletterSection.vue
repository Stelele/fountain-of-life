<script setup lang="ts">
import { WHATSAPP_URL } from '@/data/churchInfo'
</script>

<template>
  <div class="bg-navy py-10">
    <div class="mx-auto max-w-md px-4 text-center">
      <h2 class="mb-2 text-white text-xl font-bold md:text-2xl">Stay Connected</h2>
      <p class="mb-6 text-sky text-sm md:text-base">
        Join our WhatsApp community for sermons, prayer requests, and church updates
      </p>
      <UButton
        icon="i-lucide-message-circle"
        :to="WHATSAPP_URL"
        target="_blank"
        color="secondary"
        size="lg"
      >
        Chat on WhatsApp
      </UButton>
    </div>
  </div>
</template>
