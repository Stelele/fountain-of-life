<script setup lang="ts">
const gatherings = [
  { title: 'Marathon Prayer', time: 'Sunday 8:00 AM – 9:00 AM', description: 'Start your Sunday with powerful corporate prayer and intercession' },
  { title: 'Main Service', time: 'Sunday 9:00 AM – 12:00 PM', description: 'Life-changing worship, the Word, and fellowship' },
]
</script>

<template>
  <div class="bg-muted py-10">
    <div class="mx-4 sm:mx-8 md:mx-16">
      <h2 class="mb-2 text-center text-highlighted text-xl font-semibold md:text-2xl">Our Gatherings</h2>
      <p class="mb-6 text-center text-sm text-neutral-500">Join us as we worship, learn, and grow together</p>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <UCard v-for="gathering in gatherings" :key="gathering.title" class="bg-white">
          <UBadge variant="subtle" color="primary" class="mb-2">{{ gathering.time }}</UBadge>
          <h3 class="text-highlighted font-semibold">{{ gathering.title }}</h3>
          <p class="mt-1 text-sm text-neutral-500">{{ gathering.description }}</p>
        </UCard>
      </div>
    </div>
  </div>
</template>
