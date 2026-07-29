<script setup lang="ts">
const events = [
  { title: 'Sunday Worship', date: 'Every Sunday 9AM & 5PM', description: 'Experience God\'s presence in our weekly worship services' },
  { title: 'Midweek Bible Study', date: 'Every Wednesday 6PM', description: 'Dive deeper into the Word in an interactive study setting' },
  { title: 'Prayer Meeting', date: 'Every Friday 6PM', description: 'A powerful time of corporate prayer and intercession' },
]
</script>

<template>
  <div class="bg-cream py-10">
    <div class="mx-4 sm:mx-8 md:mx-16">
      <h2 class="mb-2 text-center text-navy text-xl font-semibold md:text-2xl">Our Gatherings</h2>
      <p class="mb-6 text-center text-sm text-neutral-500">Join us as we worship, learn, and grow together</p>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <UCard v-for="event in events" :key="event.title" class="bg-white">
          <UBadge variant="subtle" color="primary" class="mb-2">{{ event.date }}</UBadge>
          <h3 class="text-navy font-semibold">{{ event.title }}</h3>
          <p class="mt-1 text-sm text-neutral-500">{{ event.description }}</p>
        </UCard>
      </div>
    </div>
  </div>
</template>
