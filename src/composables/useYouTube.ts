import { ref } from 'vue'
import type { Video } from '@/types'
import { YOUTUBE_CHANNEL_ID } from '@/data/churchInfo'

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || ''

function getTagValue(parent: Element, tagName: string): string {
  const el = parent.getElementsByTagName(tagName)[0]
  return el?.textContent || ''
}

function parseDevXml(xml: string): Video[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const entries = doc.getElementsByTagName('entry')

  return Array.from(entries).map((entry) => {
    const id = getTagValue(entry, 'yt:videoId')
    const title = getTagValue(entry, 'title')
    const publishedAt = getTagValue(entry, 'published')
    const linkEl = entry.getElementsByTagName('link')[0]
    const url = linkEl?.getAttribute('href') || ''
    const thumbnail = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : ''
    return { id, title, thumbnail, publishedAt, url }
  }).filter((v) => v.id)
}

interface Rss2JsonItem {
  guid: string
  title: string
  pubDate: string
  link: string
  thumbnail: string
}

function parseProdJson(data: { items: Rss2JsonItem[] }): Video[] {
  return (data.items || []).map((item) => {
    const id = item.guid?.replace('yt:video:', '') || ''
    return {
      id,
      title: item.title,
      thumbnail: item.thumbnail || (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : ''),
      publishedAt: item.pubDate,
      url: item.link,
    }
  }).filter((v) => v.id)
}

interface YouTubeApiItem {
  snippet: {
    resourceId: { videoId: string }
    title: string
    thumbnails?: { medium?: { url: string }; default?: { url: string } }
    publishedAt: string
  }
}

export function useYouTube() {
  const videos = ref<Video[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref<string | null>(null)
  const nextPageToken = ref<string | null>(null)
  const hasMore = ref(false)
  let rssLoaded = false

  async function fetchRSS(): Promise<void> {
    if (rssLoaded) return
    loading.value = true
    error.value = null

    try {
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`

      if (import.meta.env.DEV) {
        const response = await fetch(`/api/youtube-rss?channel_id=${YOUTUBE_CHANNEL_ID}`)
        if (!response.ok) throw new Error('RSS feed unavailable')
        const xml = await response.text()
        videos.value = parseDevXml(xml)
      } else {
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error('RSS feed unavailable')
        const data = await response.json()
        if (data.status !== 'ok') throw new Error('RSS feed unavailable')
        videos.value = parseProdJson(data)
      }

      rssLoaded = true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load videos'
    } finally {
      loading.value = false
    }
  }

  async function loadMore(): Promise<void> {
    if (!YOUTUBE_API_KEY || loadingMore.value) return
    loadingMore.value = true
    error.value = null

    try {
      const uploadsPlaylistId = YOUTUBE_CHANNEL_ID.replace(/^UC/, 'UU')
      let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`
      if (nextPageToken.value) {
        url += `&pageToken=${nextPageToken.value}`
      }

      const response = await fetch(url)
      if (!response.ok) throw new Error('Unable to load more videos')

      const data = await response.json()
      nextPageToken.value = data.nextPageToken || null
      hasMore.value = !!(data.nextPageToken && data.items?.length)

      if (data.items?.length) {
        const apiVideos: Video[] = data.items.map((item: YouTubeApiItem) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
          publishedAt: item.snippet.publishedAt,
          url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
        }))

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

  return { videos, loading, loadingMore, error, hasMore, fetchRSS, loadMore }
}
