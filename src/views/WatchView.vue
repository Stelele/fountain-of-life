<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Video } from '@/types'
import { useYouTube } from '@/composables/useYouTube'
import { useNewVideosAlert } from '@/composables/useNewVideosAlert'
import VideoGrid from '@/components/VideoGrid.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

const { videos, loading, loadingMore, error, hasMore, fetchVideos, loadMore } = useYouTube()
const { newVideoCount, markLatestSeen } = useNewVideosAlert()
const selectedVideo = ref<Video | null>(null)

onMounted(async () => {
  await fetchVideos()
  if (videos.value[0]?.id) {
    markLatestSeen(videos.value[0].id)
  }
})

function onSelect(video: Video) {
  selectedVideo.value = video
}

function onClosePlayer() {
  selectedVideo.value = null
}
</script>

<template>
  <UPage>
    <UPageHeader
      title="Watch"
      description="Sermons, worship, and messages"
    />
    <UPageBody>
      <UAlert
        v-if="newVideoCount > 0"
        icon="i-lucide-video"
        :title="`${newVideoCount} new ${newVideoCount === 1 ? 'video' : 'videos'} available`"
        description="Check out the latest sermons"
        color="primary"
        variant="subtle"
        class="mb-4"
        :close="{ icon: 'i-lucide-x' }"
      />
      <VideoGrid
        :videos="videos"
        :loading="loading"
        :loading-more="loadingMore"
        :error="error"
        :has-more="hasMore"
        @select="onSelect"
        @load-more="loadMore"
        @retry="fetchVideos"
      />
      <VideoPlayer :video="selectedVideo" @close="onClosePlayer" />
    </UPageBody>
  </UPage>
</template>
