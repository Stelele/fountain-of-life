import { db, type CachedVideoEntry } from '@/services/db'
import type { Video } from '@/types'

const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

function isFresh(entry: CachedVideoEntry): boolean {
  return Date.now() - entry.timestamp < CACHE_TTL_MS
}

export async function getCachedVideos(
  cacheKey: string,
): Promise<{ videos: Video[]; nextPageToken: string | null } | null> {
  try {
    const entry = await db.videoCache.get(cacheKey)
    if (entry && isFresh(entry)) {
      return { videos: entry.videos, nextPageToken: entry.nextPageToken }
    }
    // Expired or not found — clean up
    if (entry) await db.videoCache.delete(cacheKey)
    return null
  } catch {
    return null
  }
}

export async function setCachedVideos(
  cacheKey: string,
  videos: Video[],
  nextPageToken: string | null,
): Promise<void> {
  try {
    await db.videoCache.put({
      id: cacheKey,
      videos,
      nextPageToken,
      timestamp: Date.now(),
    })
  } catch {
    // Storage full or disabled — silently skip
  }
}

export async function appendCachedVideos(
  cacheKey: string,
  newVideos: Video[],
  nextPageToken: string | null,
): Promise<void> {
  try {
    const entry = await db.videoCache.get(cacheKey)
    const existingIds = new Set((entry?.videos || []).map((v) => v.id))
    const deduped = newVideos.filter((v) => !existingIds.has(v.id))

    await db.videoCache.put({
      id: cacheKey,
      videos: [...(entry?.videos || []), ...deduped],
      nextPageToken,
      timestamp: entry?.timestamp || Date.now(),
    })
  } catch {
    // Silently skip
  }
}
