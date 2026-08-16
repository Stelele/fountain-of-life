import { ref } from 'vue'
import type { Video } from '@/types'
import { YOUTUBE_CHANNELS, type YouTubeChannel } from '@/data/churchInfo'
import { getCachedVideos, setCachedVideos, appendCachedVideos } from '@/services/cache/videoCache'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || ''
const MAX_RESULTS = 12

interface ChannelState {
  videos: Video[]
  nextPageToken: string | null
  hasMore: boolean
}

interface ApiItem {
  snippet: {
    resourceId: { videoId: string }
    title: string
    thumbnails?: { medium?: { url: string }; default?: { url: string } }
    publishedAt: string
  }
}

interface ApiResponse {
  items?: ApiItem[]
  nextPageToken?: string
}

function buildUrl(channel: YouTubeChannel, pageToken?: string): string {
  const playlistId = channel.id.replace(/^UC/, 'UU')
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${playlistId}&key=${API_KEY}`
  if (pageToken) url += `&pageToken=${pageToken}`
  return url
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

function mergeAndSort(videosByChannel: Record<string, Video[]>): Video[] {
  const byId = new Map<string, Video>()
  for (const videos of Object.values(videosByChannel)) {
    for (const video of videos) {
      if (!byId.has(video.id)) byId.set(video.id, video)
    }
  }
  return [...byId.values()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export function useYouTube() {
  const channelStates = ref<Record<string, ChannelState>>({})
  const videos = ref<Video[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref<string | null>(null)
  const hasMore = ref(false)
  let loaded = false

  function rebuildMerged(): void {
    const byChannel: Record<string, Video[]> = {}
    for (const channel of YOUTUBE_CHANNELS) {
      byChannel[channel.id] = channelStates.value[channel.id]?.videos || []
    }
    videos.value = mergeAndSort(byChannel)
    hasMore.value = YOUTUBE_CHANNELS.some(
      (channel) => channelStates.value[channel.id]?.hasMore,
    )
  }

  async function fetchChannelPage(
    channel: YouTubeChannel,
    pageToken?: string,
  ): Promise<ApiResponse> {
    const response = await fetch(buildUrl(channel, pageToken))
    if (!response.ok) throw new Error('Unable to load videos')
    return response.json()
  }

  async function loadChannel(channel: YouTubeChannel): Promise<void> {
    const cached = await getCachedVideos(channel.id)
    if (cached) {
      channelStates.value[channel.id] = {
        videos: cached.videos,
        nextPageToken: cached.nextPageToken,
        hasMore: !!cached.nextPageToken,
      }
      return
    }

    const data = await fetchChannelPage(channel)
    const items = data.items || []
    const pageToken = data.nextPageToken || null
    const apiVideos = mapItems(items)

    channelStates.value[channel.id] = {
      videos: apiVideos,
      nextPageToken: pageToken,
      hasMore: !!(pageToken && items.length),
    }
    await setCachedVideos(channel.id, apiVideos, pageToken)
  }

  async function fetchVideos(): Promise<void> {
    if (loaded || !API_KEY) return
    loading.value = true
    error.value = null

    try {
      await Promise.all(YOUTUBE_CHANNELS.map((channel) => loadChannel(channel)))
      rebuildMerged()
      loaded = true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load videos'
    } finally {
      loading.value = false
    }
  }

  async function loadMore(): Promise<void> {
    if (!API_KEY || loadingMore.value || loading.value) return
    const channelsWithMore = YOUTUBE_CHANNELS.filter(
      (channel) => channelStates.value[channel.id]?.nextPageToken,
    )
    if (!channelsWithMore.length) return

    loadingMore.value = true
    error.value = null

    try {
      await Promise.all(
        channelsWithMore.map(async (channel) => {
          const state = channelStates.value[channel.id]
          const data = await fetchChannelPage(channel, state?.nextPageToken ?? undefined)
          const items = data.items || []
          const pageToken = data.nextPageToken || null

          const apiVideos = mapItems(items)
          const existingIds = new Set(state?.videos.map((v) => v.id) || [])
          const newVideos = apiVideos.filter((v) => !existingIds.has(v.id))

          channelStates.value[channel.id] = {
            videos: [...(state?.videos || []), ...newVideos],
            nextPageToken: pageToken,
            hasMore: !!(pageToken && items.length),
          }
          await appendCachedVideos(channel.id, newVideos, pageToken)
        }),
      )
      rebuildMerged()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load more videos'
    } finally {
      loadingMore.value = false
    }
  }

  return { videos, loading, loadingMore, error, hasMore, fetchVideos, loadMore }
}