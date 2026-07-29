<script setup lang="ts">
import { WHATSAPP_GROUP_URL } from '@/data/churchInfo'
</script>

<template>
  <a
    :href="WHATSAPP_GROUP_URL"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 lg:bottom-8"
    aria-label="Chat on WhatsApp"
  >
    <UIcon name="i-lucide-message-circle" class="text-2xl text-white" />
  </a>
</template>
