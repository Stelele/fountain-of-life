<script setup lang="ts">
import type { Video } from '@/types'

defineProps<{
  video: Video | null
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <UModal :open="video !== null" @update:open="$emit('close')">
    <template #body>
      <div v-if="video" class="aspect-video w-full">
        <iframe
          :src="`https://www.youtube.com/embed/${video.id}?autoplay=1`"
          class="h-full w-full"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        />
      </div>
    </template>
  </UModal>
</template>
