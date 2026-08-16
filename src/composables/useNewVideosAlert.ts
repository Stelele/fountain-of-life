import { ref, onMounted } from 'vue'
import { YOUTUBE_CHANNELS } from '@/data/churchInfo'

const STORAGE_KEY = 'fountain_last_seen_video_id'
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || ''

function safeGetItem(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}

function safeSetItem(key: string, value: string): void {
  try { localStorage.setItem(key, value) } catch {}
}

export function useNewVideosAlert() {
  const newVideoCount = ref(0)

  async function checkForNewVideos(): Promise<void> {
    if (!API_KEY) return
    try {
      const latest = await Promise.all(
        YOUTUBE_CHANNELS.map(async (channel) => {
          const playlistId = channel.id.replace(/^UC/, 'UU')
          const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${playlistId}&key=${API_KEY}`

          const response = await fetch(url)
          if (!response.ok) return null

          const data = await response.json()
          const item = data.items?.[0]
          if (!item?.snippet?.resourceId?.videoId) return null

          return {
            id: item.snippet.resourceId.videoId,
            publishedAt: item.snippet.publishedAt,
          }
        }),
      )

      const newest = latest
        .filter((item): item is { id: string; publishedAt: string } => item !== null)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0]

      if (!newest) return
      const latestId = newest.id

      const lastSeenId = safeGetItem(STORAGE_KEY)
      if (!lastSeenId) {
        safeSetItem(STORAGE_KEY, latestId)
        return
      }

      if (latestId !== lastSeenId) {
        // Can't determine exact count with a single-item fetch.
        // Just signal there's new content.
        newVideoCount.value = 1
      }
    } catch {
      // Silently fail
    }
  }

  function markLatestSeen(latestId?: string): void {
    newVideoCount.value = 0
    if (latestId) {
      safeSetItem(STORAGE_KEY, latestId)
    }
  }

  onMounted(() => {
    checkForNewVideos()
  })

  return { newVideoCount, markLatestSeen }
}
