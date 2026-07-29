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
    role="button"
    tabindex="0"
    :aria-label="`Watch: ${video.title}`"
    @click="$emit('select', video)"
    @keydown.enter.prevent="$emit('select', video)"
    @keydown.space.prevent="$emit('select', video)"
  >
    <div class="relative aspect-video w-full overflow-hidden bg-zinc-100">
      <img
        :src="video.thumbnail"
        :alt="video.title"
        class="h-full w-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 flex items-center justify-center bg-zinc-950/20 opacity-0 transition-opacity hover:opacity-100">
        <UIcon name="i-lucide-play-circle" class="text-inverted text-5xl" />
      </div>
    </div>
    <div class="p-3">
      <p class="text-highlighted line-clamp-2 text-sm font-medium">{{ video.title }}</p>
      <p class="mt-1 text-xs text-zinc-500">{{ formatDate(video.publishedAt) }}</p>
    </div>
  </UCard>
</template>
