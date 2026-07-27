<script setup lang="ts">
const serviceTimes = [
  { day: 'Sunday', time: '9:00 AM', description: 'Morning Worship Service' },
  { day: 'Sunday', time: '5:00 PM', description: 'Evening Service' },
  { day: 'Wednesday', time: '6:00 PM', description: 'Midweek Bible Study' },
  { day: 'Friday', time: '6:00 PM', description: 'Prayer Meeting' },
]
</script>

<template>
  <UCard class="mx-4 mt-6">
    <template #header>
      <h2 class="text-[var(--color-navy)] text-lg font-semibold pt-1">Service Times</h2>
    </template>

    <div class="divide-y divide-gray-100">
      <div
        v-for="service in serviceTimes"
        :key="service.day + service.time"
        class="flex items-center justify-between py-3 first:pt-0 last:pb-0"
      >
        <div>
          <p class="text-[var(--color-navy)] font-medium">{{ service.day }}</p>
          <p class="text-sm text-gray-500">{{ service.description }}</p>
        </div>
        <UBadge color="primary" variant="subtle">
          {{ service.time }}
        </UBadge>
      </div>
    </div>
  </UCard>
</template>
