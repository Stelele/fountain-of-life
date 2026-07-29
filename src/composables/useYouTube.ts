import { ref } from 'vue'
import type { Video } from '@/types'
import { YOUTUBE_CHANNEL_ID } from '@/data/churchInfo'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || ''
const MAX_RESULTS = 12

function buildUrl(pageToken?: string): string {
  const playlistId = YOUTUBE_CHANNEL_ID.replace(/^UC/, 'UU')
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${playlistId}&key=${API_KEY}`
  if (pageToken) url += `&pageToken=${pageToken}`
  return url
}

interface ApiItem {
  snippet: {
    resourceId: { videoId: string }
    title: string
    thumbnails?: { medium?: { url: string }; default?: { url: string } }
    publishedAt: string
  }
}

function mapItems(items: ApiItem[]): Video[] {
  return items.map((item) => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
    publishedAt: item.snippet.publishedAt,
    url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
  }))
}

export function useYouTube() {
  const videos = ref<Video[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref<string | null>(null)
  const nextPageToken = ref<string | null>(null)
  const hasMore = ref(false)
  let loaded = false

  async function fetchVideos(): Promise<void> {
    if (loaded || !API_KEY) return
    loading.value = true
    error.value = null

    try {
      const response = await fetch(buildUrl())
      if (!response.ok) throw new Error('Unable to load videos')

      const data = await response.json()
      nextPageToken.value = data.nextPageToken || null
      hasMore.value = !!(data.nextPageToken && data.items?.length)

      if (data.items?.length) {
        videos.value = mapItems(data.items)
      }

      loaded = true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load videos'
    } finally {
      loading.value = false
    }
  }

  async function loadMore(): Promise<void> {
    if (!API_KEY || loadingMore.value || loading.value) return
    loadingMore.value = true
    error.value = null

    try {
      const response = await fetch(buildUrl(nextPageToken.value ?? undefined))
      if (!response.ok) throw new Error('Unable to load more videos')

      const data = await response.json()
      nextPageToken.value = data.nextPageToken || null
      hasMore.value = !!(data.nextPageToken && data.items?.length)

      if (data.items?.length) {
        const apiVideos = mapItems(data.items)
        const existingIds = new Set(videos.value.map((v) => v.id))
        const newVideos = apiVideos.filter((v) => !existingIds.has(v.id))
        videos.value = [...videos.value, ...newVideos]
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load more videos'
    } finally {
      loadingMore.value = false
    }
  }

  return { videos, loading, loadingMore, error, hasMore, fetchVideos, loadMore }
}
