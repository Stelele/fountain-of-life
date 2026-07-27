<script setup lang="ts">
import { useOffline } from '@/composables/useOffline'

const { isOffline } = useOffline()
</script>

<template>
  <UAlert
    v-if="isOffline"
    title="You're offline"
    description="Showing cached content. Some features may be unavailable."
    icon="i-lucide-wifi-off"
    color="warning"
    :close-button="{ icon: 'i-lucide-x' }"
    class="mx-4 mt-2"
  />
</template>
