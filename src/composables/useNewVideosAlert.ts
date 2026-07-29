import { ref, onMounted } from 'vue'
import { YOUTUBE_CHANNEL_ID } from '@/data/churchInfo'

const STORAGE_KEY = 'fountain_last_seen_video_id'

function safeGetItem(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}

function safeSetItem(key: string, value: string): void {
  try { localStorage.setItem(key, value) } catch {}
}

function getRssApiUrl(): string {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`
  if (import.meta.env.DEV) {
    return `/api/youtube-rss?channel_id=${YOUTUBE_CHANNEL_ID}`
  }
  return `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
}

export function useNewVideosAlert() {
  const newVideoCount = ref(0)

  async function checkForNewVideos(): Promise<void> {
    try {
      const response = await fetch(getRssApiUrl())
      if (!response.ok) return

      let latestId: string | null = null
      let allIds: string[] = []

      if (import.meta.env.DEV) {
        const xml = await response.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(xml, 'text/xml')
        const entries = doc.getElementsByTagName('entry')
        for (const entry of entries) {
          const el = entry.getElementsByTagName('yt:videoId')[0]
          if (el?.textContent) {
            if (!latestId) latestId = el.textContent
            allIds.push(el.textContent)
          }
        }
      } else {
        const data = await response.json()
        if (data.status !== 'ok' || !data.items?.length) return
        latestId = data.items[0].guid?.replace('yt:video:', '') || null
        allIds = data.items.map((item: any) => item.guid?.replace('yt:video:', '') || '')
      }

      if (!latestId) return

      const lastSeenId = safeGetItem(STORAGE_KEY)
      if (!lastSeenId) {
        safeSetItem(STORAGE_KEY, latestId)
        return
      }

      if (latestId !== lastSeenId) {
        const idx = allIds.indexOf(lastSeenId)
        newVideoCount.value = idx === -1 ? allIds.length : idx
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
