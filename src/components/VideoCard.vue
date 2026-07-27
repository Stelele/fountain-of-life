<script setup lang="ts">
import type { Video } from '@/types'

defineProps<{
  video: Video
}>()

defineEmits<{
  select: [video: Video]
}>()

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<template>
  <UCard
    class="cursor-pointer overflow-hidden transition-transform hover:scale-[1.02]"
    :ui="{ body: 'p-0', header: 'p-0' }"
    @click="$emit('select', video)"
  >
    <div class="relative aspect-video w-full overflow-hidden bg-gray-100">
      <img
        :src="video.thumbnail"
        :alt="video.title"
        class="h-full w-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
        <UIcon name="i-lucide-play-circle" class="text-white text-5xl" />
      </div>
    </div>
    <div class="p-3">
      <p class="text-[var(--color-navy)] line-clamp-2 text-sm font-medium">{{ video.title }}</p>
      <p class="mt-1 text-xs text-gray-500">{{ formatDate(video.publishedAt) }}</p>
    </div>
  </UCard>
</template>
