<script setup lang="ts">
import { WHATSAPP_URL } from '@/data/churchInfo'
</script>

<template>
  <div class="bg-muted py-10" id="give">
    <div class="mx-4 sm:mx-8 md:mx-16 text-center">
      <UIcon name="i-lucide-heart-handshake" class="mx-auto mb-3 text-primary-500 text-3xl" />
      <h2 class="mb-2 text-highlighted text-xl font-bold md:text-2xl">Give</h2>
      <p class="mx-auto mb-6 max-w-md text-sm text-zinc-500">
        Your generosity fuels the work of the ministry. Thank you for partnering with us to spread the Gospel.
      </p>
      <div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <UButton
          icon="i-lucide-message-circle"
          :to="WHATSAPP_URL"
          target="_blank"
          color="secondary"
          size="lg"
        >
          Give via WhatsApp
        </UButton>
        <UButton
          icon="i-lucide-landmark"
          :to="WHATSAPP_URL"
          target="_blank"
          variant="outline"
          size="lg"
        >
          Request Bank Details
        </UButton>
      </div>
      <p class="mt-4 text-xs text-zinc-400">
        2 Corinthians 9:7 — "God loves a cheerful giver"
      </p>
    </div>
  </div>
</template>
