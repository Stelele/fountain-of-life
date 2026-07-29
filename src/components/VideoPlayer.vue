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
  <UModal
    :open="video !== null"
    :dismissible="true"
    :ui="{ overlay: 'bg-zinc-950/80', content: 'w-[80vw] max-w-none bg-zinc-950' }"
    @update:open="$emit('close')"
  >
    <template #body>
      <div v-if="video" class="h-[70vh] w-full">
        <iframe
          :src="`https://www.youtube.com/embed/${video.id}?autoplay=1`"
          :title="video.title"
          class="h-full w-full rounded"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        />
      </div>
    </template>
  </UModal>
</template>
