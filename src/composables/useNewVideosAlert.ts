import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'fountain_last_seen_video_id'

function getFirstVideoIdProd(data: any): string | null {
  if (!data.items || data.items.length === 0) return null
  return data.items[0].guid?.replace('yt:video:', '') || null
}

function countNewVideosProd(data: any, lastSeenId: string): number {
  let count = 0
  for (const item of data.items) {
    const id = item.guid?.replace('yt:video:', '') || ''
    if (id === lastSeenId) break
    count++
  }
  return count
}

export function useNewVideosAlert() {
  const newVideoCount = ref(0)
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCOAoHXW3nCre1EACIn-soIQ'

  function getRssApiUrl(): string {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    if (import.meta.env.DEV) {
      return `/api/youtube-rss?channel_id=${channelId}`
    }
    return `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
  }

  async function checkForNewVideos(): Promise<void> {
    try {
      const response = await fetch(getRssApiUrl())
      if (!response.ok) return

      if (import.meta.env.DEV) {
        const xml = await response.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(xml, 'text/xml')
        const entries = doc.getElementsByTagName('entry')
        if (!entries[0]) return
        const videoIdEl = entries[0].getElementsByTagName('yt:videoId')[0]
        const latestId = videoIdEl?.textContent
        if (!latestId) return

        const lastSeenId = localStorage.getItem(STORAGE_KEY)
        if (!lastSeenId) {
          localStorage.setItem(STORAGE_KEY, latestId)
          return
        }
        if (latestId !== lastSeenId) {
          let count = 0
          for (const entry of entries) {
            const el = entry.getElementsByTagName('yt:videoId')[0]
            if (el?.textContent === lastSeenId) break
            count++
          }
          newVideoCount.value = count
        }
      } else {
        const data = await response.json()
        if (data.status !== 'ok') return
        const latestId = getFirstVideoIdProd(data)
        if (!latestId) return

        const lastSeenId = localStorage.getItem(STORAGE_KEY)
        if (!lastSeenId) {
          localStorage.setItem(STORAGE_KEY, latestId)
          return
        }
        if (latestId !== lastSeenId) {
          newVideoCount.value = countNewVideosProd(data, lastSeenId)
        }
      }
    } catch {
      // Silently fail
    }
  }

  function markLatestSeen(): void {
    newVideoCount.value = 0
    fetch(getRssApiUrl())
      .then((r) => r.json())
      .then((data) => {
        const id = data.items?.[0]?.guid?.replace('yt:video:', '')
        if (id) localStorage.setItem(STORAGE_KEY, id)
      })
      .catch(() => {})
  }

  onMounted(() => {
    checkForNewVideos()
  })

  return { newVideoCount, markLatestSeen }
}
