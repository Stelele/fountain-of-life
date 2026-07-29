<script setup lang="ts">
import { WHATSAPP_URL, WHATSAPP_DISPLAY, EMAIL, CHURCH_ADDRESS, FACEBOOK_URL } from '@/data/churchInfo'
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-navy text-lg font-semibold">Contact Us</h2>
    </template>
    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-map-pin" class="text-navy text-xl" />
        <div>
          <p class="text-sm font-medium">Palace Hotel, Conference Room</p>
          <p class="text-sm text-neutral-500">First Floor, Harare</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-message-circle" class="text-navy text-xl" />
        <a :href="WHATSAPP_URL" target="_blank" rel="noopener noreferrer" class="text-sm text-cyan hover:underline">{{ WHATSAPP_DISPLAY }}</a>
      </div>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-mail" class="text-navy text-xl" />
        <a :href="`mailto:${EMAIL}`" class="text-sm text-cyan hover:underline">{{ EMAIL }}</a>
      </div>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-facebook" class="text-navy text-xl" />
        <a :href="FACEBOOK_URL" target="_blank" rel="noopener noreferrer" class="text-sm text-cyan hover:underline">
          Facebook Page
        </a>
      </div>
    </div>
  </UCard>
</template>
