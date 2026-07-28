import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'fountain_last_seen_video_id'

function getRssUrl(): string {
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCOAoHXW3nCre1EACIn-soIQ'
  if (import.meta.env.DEV) {
    return `/api/youtube-rss?channel_id=${channelId}`
  }
  const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(rss)}`
}

function getFirstVideoId(xml: string): string | null {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const entries = doc.getElementsByTagName('entry')
  if (entries.length === 0 || !entries[0]) return null
  const videoIdEl = entries[0].getElementsByTagName('yt:videoId')[0]
  return videoIdEl?.textContent || null
}

function countNewVideos(xml: string, lastSeenId: string): number {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const entries = doc.getElementsByTagName('entry')
  let count = 0
  for (const entry of entries) {
    const videoIdEl = entry.getElementsByTagName('yt:videoId')[0]
    const id = videoIdEl?.textContent
    if (id === lastSeenId) break
    count++
  }
  return count
}

export function useNewVideosAlert() {
  const newVideoCount = ref(0)

  async function checkForNewVideos(): Promise<void> {
    try {
      const response = await fetch(getRssUrl())
      if (!response.ok) return
      const xml = await response.text()
      const latestId = getFirstVideoId(xml)
      if (!latestId) return

      const lastSeenId = localStorage.getItem(STORAGE_KEY)
      if (!lastSeenId) {
        localStorage.setItem(STORAGE_KEY, latestId)
        return
      }

      if (latestId !== lastSeenId) {
        newVideoCount.value = countNewVideos(xml, lastSeenId)
      }
    } catch {
      // Silently fail
    }
  }

  function markLatestSeen(): void {
    newVideoCount.value = 0
    fetch(getRssUrl())
      .then((r) => r.text())
      .then((xml) => {
        const latestId = getFirstVideoId(xml)
        if (latestId) localStorage.setItem(STORAGE_KEY, latestId)
      })
      .catch(() => {})
  }

  onMounted(() => {
    checkForNewVideos()
  })

  return { newVideoCount, markLatestSeen }
}
