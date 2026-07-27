<script setup lang="ts">
import type { Video } from '@/types'
import VideoCard from '@/components/VideoCard.vue'

defineProps<{
  videos: Video[]
  loading: boolean
  loadingMore: boolean
  error: string | null
  hasMore: boolean
}>()

defineEmits<{
  select: [video: Video]
  loadMore: []
}>()
</script>

<template>
  <div>
    <div v-if="loading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="n in 6" :key="n">
        <UCard :ui="{ body: 'p-0', header: 'p-0' }">
          <div class="aspect-video w-full bg-gray-200" />
          <div class="space-y-2 p-3">
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-3 w-1/3" />
          </div>
        </UCard>
      </div>
    </div>

    <div v-else-if="error" class="flex flex-col items-center gap-3 py-12 text-center">
      <UIcon name="i-lucide-alert-circle" class="text-4xl text-gray-400" />
      <p class="text-gray-500">Videos temporarily unavailable</p>
      <UButton variant="outline" @click="$emit('loadMore')">Retry</UButton>
    </div>

    <div v-else-if="videos.length === 0" class="flex flex-col items-center gap-3 py-12 text-center">
      <UIcon name="i-lucide-video-off" class="text-4xl text-gray-400" />
      <p class="text-gray-500">Check back soon for new videos</p>
    </div>

    <template v-else>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <VideoCard
          v-for="video in videos"
          :key="video.id"
          :video="video"
          @select="$emit('select', video)"
        />
      </div>

      <div v-if="hasMore" class="mt-6 flex justify-center">
        <UButton
          variant="outline"
          :loading="loadingMore"
          @click="$emit('loadMore')"
        >
          Load More
        </UButton>
      </div>
    </template>
  </div>
</template>
