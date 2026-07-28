import { ref } from 'vue'
import type { Video } from '@/types'

const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCOAoHXW3nCre1EACIn-soIQ'
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || ''

function getRssUrl(): string {
  if (import.meta.env.DEV) {
    return `/api/youtube-rss?channel_id=${YOUTUBE_CHANNEL_ID}`
  }
  const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(rss)}`
}

function getTagValue(parent: Element, tagName: string): string {
  const el = parent.getElementsByTagName(tagName)[0]
  return el?.textContent || ''
}

function xmlToVideos(xml: string): Video[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const entries = doc.getElementsByTagName('entry')

  return Array.from(entries).map((entry) => {
    const id = getTagValue(entry, 'yt:videoId')
    const title = getTagValue(entry, 'title')
    const publishedAt = getTagValue(entry, 'published')
    const linkEl = entry.getElementsByTagName('link')[0]
    const url = linkEl?.getAttribute('href') || ''
    const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

    return { id, title, thumbnail, publishedAt, url }
  })
}

export function useYouTube() {
  const videos = ref<Video[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref<string | null>(null)
  const nextPageToken = ref<string | null>(null)
  const hasMore = ref(false)
  const rssLoaded = ref(false)

  async function fetchRSS(): Promise<void> {
    if (rssLoaded.value) return
    loading.value = true
    error.value = null

    try {
      let response = await fetch(getRssUrl())
      if (!response.ok && !import.meta.env.DEV) {
        const directUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`
        response = await fetch(directUrl)
      }
      if (!response.ok) throw new Error('RSS feed unavailable')
      const xml = await response.text()
      const rssVideos = xmlToVideos(xml)
      videos.value = rssVideos
      rssLoaded.value = true

      if (YOUTUBE_API_KEY) {
        hasMore.value = true
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load videos'
    } finally {
      loading.value = false
    }
  }

  async function loadMore(): Promise<void> {
    if (!YOUTUBE_API_KEY || loadingMore.value) return
    loadingMore.value = true

    try {
      const uploadsPlaylistId = YOUTUBE_CHANNEL_ID.replace(/^UC/, 'UU')
      let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`
      if (nextPageToken.value) {
        url += `&pageToken=${nextPageToken.value}`
      }

      const response = await fetch(url)
      if (!response.ok) throw new Error('API quota exceeded')

      const data = await response.json()
      nextPageToken.value = data.nextPageToken || null
      hasMore.value = !!data.nextPageToken

      const apiVideos: Video[] = data.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
        publishedAt: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      }))

      const existingIds = new Set(videos.value.map((v) => v.id))
      const newVideos = apiVideos.filter((v: Video) => !existingIds.has(v.id))
      videos.value = [...videos.value, ...newVideos]
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load more videos'
    } finally {
      loadingMore.value = false
    }
  }

  return { videos, loading, loadingMore, error, hasMore, fetchRSS, loadMore }
}
