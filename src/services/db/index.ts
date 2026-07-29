import Dexie, { type EntityTable } from 'dexie'
import type { Video } from '@/types'

export interface CachedVideoEntry {
  id: string
  videos: Video[]
  nextPageToken: string | null
  timestamp: number
}

class FountainDB extends Dexie {
  videoCache!: EntityTable<CachedVideoEntry, 'id'>

  constructor() {
    super('fountain_db')

    // Handle HMR in dev — don't recreate schema if DB already exists
    this.version(1).stores({
      videoCache: 'id',
    }).upgrade(tx => {
      // Initial creation — nothing to migrate
    })
  }
}

export const db = new FountainDB()

// Handle Vite HMR: don't recreate the Dexie instance on hot reload
if (import.meta.hot) {
  import.meta.hot.accept(() => {})
}
