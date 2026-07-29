<script setup lang="ts">
import { CHURCH_ADDRESS } from '@/data/churchInfo'
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-highlighted text-lg font-semibold">Location</h2>
    </template>
    <div class="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=30.95,-17.85,31.05,-17.75&layer=mapnik"
        width="100%"
        height="100%"
        class="border-none"
        loading="lazy"
        title="Church location map"
        sandbox="allow-scripts allow-same-origin"
        referrerpolicy="no-referrer"
      />
    </div>
    <p class="mt-3 text-sm text-neutral-500">{{ CHURCH_ADDRESS }}</p>
  </UCard>
</template>
