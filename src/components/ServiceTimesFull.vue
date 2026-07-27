<script setup lang="ts">
const serviceTimes = [
  { day: 'Sunday', time: '9:00 AM', description: 'Morning Worship Service' },
  { day: 'Sunday', time: '5:00 PM', description: 'Evening Service' },
  { day: 'Wednesday', time: '6:00 PM', description: 'Midweek Bible Study' },
  { day: 'Friday', time: '6:00 PM', description: 'Prayer Meeting' },
]
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-[var(--color-navy)] text-lg font-semibold">Service Times</h2>
    </template>
    <UTable
      :data="serviceTimes"
      :columns="[
        { accessorKey: 'day', header: 'Day' },
        { accessorKey: 'time', header: 'Time' },
        { accessorKey: 'description', header: 'Service' },
      ]"
    />
  </UCard>
</template>
