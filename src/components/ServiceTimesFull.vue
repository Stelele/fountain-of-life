<script setup lang="ts">
import { SERVICE_TIMES } from '@/data/churchInfo'
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-navy text-lg font-semibold">Service Times</h2>
    </template>
    <UTable
      :data="SERVICE_TIMES"
      :columns="[
        { accessorKey: 'day', header: 'Day' },
        { accessorKey: 'time', header: 'Time' },
        { accessorKey: 'description', header: 'Service' },
      ]"
    />
  </UCard>
</template>
