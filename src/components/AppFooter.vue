<script setup lang="ts">
import { CHURCH_ADDRESS, WHATSAPP_DISPLAY, FACEBOOK_URL, SERVICE_TIMES, CHURCH_NAME, CHURCH_TAGLINE, CHURCH_SCRIPTURE } from '@/data/churchInfo'
</script>

<template>
  <footer class="mt-12 border-t border-neutral-200 py-8">
    <div class="mx-auto max-w-5xl px-4">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div>
          <h3 class="mb-3 text-navy font-semibold">{{ CHURCH_NAME }}</h3>
          <p class="text-sm text-neutral-500">{{ CHURCH_TAGLINE }}</p>
          <p class="mt-2 text-sm text-neutral-500">{{ CHURCH_SCRIPTURE }}</p>
        </div>
        <div>
          <h3 class="mb-3 text-navy font-semibold">Service Times</h3>
          <div class="space-y-1 text-sm text-neutral-500">
            <p v-for="st in SERVICE_TIMES" :key="st.day + st.time">{{ st.day }} — {{ st.time }}</p>
          </div>
        </div>
        <div>
          <h3 class="mb-3 text-navy font-semibold">Connect</h3>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2 text-neutral-500">
              <UIcon name="i-lucide-map-pin" class="text-navy text-sm" />
              <span>{{ CHURCH_ADDRESS }}</span>
            </div>
            <div class="flex items-center gap-2 text-neutral-500">
              <UIcon name="i-lucide-phone" class="text-navy text-sm" />
              <a :href="`tel:${WHATSAPP_DISPLAY.replace(/\s/g, '')}`">{{ WHATSAPP_DISPLAY }}</a>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-facebook" class="text-navy text-sm" />
              <ULink :to="FACEBOOK_URL" target="_blank" class="text-cyan hover:underline">Facebook</ULink>
            </div>
          </div>
        </div>
      </div>
      <p class="mt-8 text-center text-xs text-neutral-400">{{ CHURCH_NAME }} {{ CHURCH_TAGLINE }}</p>
    </div>
  </footer>
</template>
