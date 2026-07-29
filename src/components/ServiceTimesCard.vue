<script setup lang="ts">
import { SERVICE_TIMES } from '@/data/churchInfo'
</script>

<template>
  <UCard class="mx-4 mt-6">
    <template #header>
      <h2 class="text-highlighted text-lg font-semibold pt-1">Service Times</h2>
    </template>

    <div class="divide-y divide-zinc-100">
      <div
        v-for="service in SERVICE_TIMES"
        :key="service.day + service.time"
        class="flex items-center justify-between py-3 first:pt-0 last:pb-0"
      >
        <div>
          <p class="text-highlighted font-medium">{{ service.day }}</p>
          <p class="text-sm text-zinc-500">{{ service.description }}</p>
        </div>
        <UBadge color="primary" variant="subtle">
          {{ service.time }}
        </UBadge>
      </div>
    </div>
  </UCard>
</template>
