<script setup lang="ts">
import { WHATSAPP_URL, WHATSAPP_DISPLAY, EMAIL, CHURCH_ADDRESS, FACEBOOK_URL } from '@/data/churchInfo'
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-highlighted text-lg font-semibold">Contact Us</h2>
    </template>
    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-map-pin" class="text-highlighted text-xl" />
        <p class="text-sm text-zinc-600">{{ CHURCH_ADDRESS }}</p>
      </div>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-message-circle" class="text-highlighted text-xl" />
        <a :href="WHATSAPP_URL" target="_blank" rel="noopener noreferrer" class="text-sm text-primary-700 hover:underline">{{ WHATSAPP_DISPLAY }}</a>
      </div>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-mail" class="text-highlighted text-xl" />
        <a :href="`mailto:${EMAIL}`" class="text-sm text-primary-700 hover:underline">{{ EMAIL }}</a>
      </div>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-facebook" class="text-highlighted text-xl" />
        <a :href="FACEBOOK_URL" target="_blank" rel="noopener noreferrer" class="text-sm text-primary-700 hover:underline">
          Facebook Page
        </a>
      </div>
    </div>
  </UCard>
</template>
