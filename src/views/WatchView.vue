<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Video } from '@/types'
import { useYouTube } from '@/composables/useYouTube'
import { useNewVideosAlert } from '@/composables/useNewVideosAlert'
import VideoGrid from '@/components/VideoGrid.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

const { videos, loading, loadingMore, error, hasMore, fetchRSS, loadMore } = useYouTube()
const { newVideoCount, markLatestSeen } = useNewVideosAlert()
const selectedVideo = ref<Video | null>(null)

onMounted(async () => {
  await fetchRSS()
  markLatestSeen()
})

function onSelect(video: Video) {
  selectedVideo.value = video
}

function onClosePlayer() {
  selectedVideo.value = null
}
</script>

<template>
  <div class="px-4 py-6 sm:px-8 md:px-12">
    <h1 class="mb-1 text-[var(--color-navy)] text-2xl font-bold md:text-3xl">Watch</h1>
    <p class="mb-6 text-gray-500 md:text-lg">Sermons, worship, and messages</p>

    <UAlert
      v-if="newVideoCount > 0"
      icon="i-lucide-video"
      :title="`${newVideoCount} new ${newVideoCount === 1 ? 'video' : 'videos'} available`"
      description="Check out the latest sermons"
      color="primary"
      variant="subtle"
      class="mb-4"
      :close-button="{ icon: 'i-lucide-x', onClick: () => (newVideoCount = 0) }"
    />

    <VideoGrid
      :videos="videos"
      :loading="loading"
      :loading-more="loadingMore"
      :error="error"
      :has-more="hasMore"
      @select="onSelect"
      @load-more="loadMore"
    />

    <VideoPlayer
      :video="selectedVideo"
      @close="onClosePlayer"
    />
  </div>
</template>
