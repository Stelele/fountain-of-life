# Fountain of Life Website — Design Spec

**Date:** 2026-07-27
**Status:** Draft (v3 — Simplified)

## Overview

A mobile-first PWA website for Fountain of Life Church, aggregating content from the church's Facebook page and YouTube channel, presented with a bottom-tab navigation using Nuxt UI v4 components. Pure static site — no backend, no database, no push notifications.

### External Links

- **Facebook:** https://www.facebook.com/share/14ngyaWEezU/
- **YouTube:** https://www.youtube.com/channel/UCOAoHXW3nCre1EACIn-soIQ

## Goals

1. Serve both church members (updates, sermons) and visitors (what to expect, location)
2. Aggregate Facebook posts and YouTube videos into a unified experience
3. Be installable as a PWA with offline support
4. Use Nuxt UI v4 for all UI components
5. Work on both Android and iOS as a PWA
6. Zero backend — pure static deployment

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 (Composition API, `<script setup>`) + Vite |
| UI | @nuxt/ui v4 (Tailwind CSS), used as Vue plugin |
| State | Vue reactivity (ref/computed) + simple composables |
| Routing | Vue Router 4 (hash history) |
| PWA | vite-plugin-pwa (Workbox) |
| HTTP | fetch (browser native) |
| Hosting | DigitalOcean App Platform (static site) |

## Architecture

```
┌─────────────────────────────────────────────────┐
│              Browser (PWA)                        │
│  Service Worker: offline cache                    │
│  Bottom tabs: Home | Watch | Connect | About      │
└──────┬──────────┬──────────┬─────────────────────┘
       │ RSS      │ API Key  │ iframe
       ▼          ▼          ▼
  YouTube RSS  YouTube API  Facebook Page
  (free/no key)(referrer-locked)(no key needed)
```

**Zero backend.** The entire app is static HTML/CSS/JS. Vite builds to `dist/`, deployed to DO App Platform as a static site.

## Navigation

Bottom-tab navigation with 4 tabs:

| Tab | Icon | Content |
|-----|------|---------|
| Home | `i-lucide-home` | Hero section (church name, tagline, logo), service times at a glance |
| Watch | `i-lucide-play` | YouTube videos: RSS feed (latest 15) + "Load More" via Data API for back catalogue |
| Connect | `i-lucide-message-circle` | Facebook Page Plugin iframe embed |
| About | `i-lucide-info` | Location + map, full service times, contact info, beliefs/vision statement |

## Pages & Components

### Routing
- Vue Router with hash history (`createWebHashHistory`)
- `/` → HomeView
- `/watch` → WatchView
- `/connect` → ConnectView
- `/about` → AboutView

### App Shell (`App.vue`)
- `<router-view />` with `<Transition>`
- `<BottomNav />` — fixed bottom tab bar with Lucide icons

### HomeView (`views/HomeView.vue`)
- `<HeroSection />` — church logo (water splash + cross from flyer), name "Fountain of Life" in gold, tagline, watercolor blue gradient background
- `<ServiceTimesCard />` — service schedule in `<UCard>` (day + time)

### WatchView (`views/WatchView.vue`)
- `<VideoGrid />` — responsive grid of video cards with two data sources:
  - **Initial load:** YouTube RSS feed (free, no key) — parses XML client-side, shows latest ~15 videos
  - **"Load More":** YouTube Data API v3 `playlistItems.list` — fetches older videos from uploads playlist, paginated
- `<VideoCard />` (xN) — `<UCard>` with thumbnail, title, date, click to open
- `<VideoPlayer />` — `<UModal>` with YouTube iframe embed
- States: loading (`<USkeleton>`), error (retry `<UButton>`), empty ("Check back soon")
- API key restricted by HTTP referrer to `fountainoflife.org` and `localhost:5173`

### ConnectView (`views/ConnectView.vue`)
- `<FacebookFeed />` — Facebook Page Plugin iframe in `<UCard>`
- Fallback: if iframe fails to load (ad-blockers, regional blocks), show "Follow us on Facebook" `<UButton>` link

### AboutView (`views/AboutView.vue`)
- `<LocationMap />` — OpenStreetMap or Google Maps iframe in `<UCard>`
- `<ServiceTimesFull />` — full schedule in `<UCard>` list
- `<ContactInfo />` — address, phone, email in `<UCard>`
- `<BeliefsSection />` — statement of faith in `<UCard>`

## YouTube Strategy

### Tier 1: RSS Feed (initial load, 0 cost)
- URL: `https://www.youtube.com/feeds/videos.xml?channel_id=UCOAoHXW3nCre1EACIn-soIQ`
- Parsed client-side using `DOMParser` or a tiny XML-to-JSON helper
- Returns latest 15 videos with title, thumbnail, link, published date
- No API key, no quota, no rate limits
- Shows immediately on Watch tab load

### Tier 2: Data API (load older videos, on-demand)
- Endpoint: `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUCOAoHXW3nCre1EACIn-soIQ&key=API_KEY&pageToken=...`
- API key restricted by HTTP referrer in Google Cloud Console
- Fired when user taps "Load More" at bottom of video grid
- Paginated with `nextPageToken`
- Uses `playlistItems.list` (1 quota unit) not `search.list` (100 units)

## PWA Features

### Installability
- Web manifest with church name, icons, theme color (navy `#1a2a4a`)
- **Android:** `beforeinstallprompt` event → Nuxt UI toast after 30s
- **iOS:** Detect platform → show instructions ("Tap Share → Add to Home Screen") as a Nuxt UI slide-down banner. iOS PWA meta tags: `apple-mobile-web-app-capable`, `apple-mobile-web-app-title`, `apple-mobile-web-app-status-bar-style`

### Offline Support
- `vite-plugin-pwa` with `generateSW` strategy, `registerType: "autoUpdate"`
- Precache: app shell (HTML, CSS, JS, fonts)
- Runtime cache: YouTube thumbnails (`i.ytimg.com`), YouTube RSS XML, Facebook iframe
- Offline `<UAlert>` banner when `navigator.onLine` is false
- `<USkeleton>` placeholders when data not cached

### Service Worker Lifecycle
- `skipWaiting: true` + `clientsClaim: true`
- On new SW detected → `<UToast>` "Update available — tap to reload"

## Data Composables

### `composables/useYouTube.ts`
- `videos: Ref<Video[]>` — all loaded videos (RSS + API combined, deduplicated)
- `loading: Ref<boolean>`
- `hasMore: Ref<boolean>`
- `error: Ref<string | null>`
- `fetchRSS()` — fetch and parse YouTube RSS feed
- `loadMore()` — fetch next page from YouTube Data API
- Deduplication by video ID (RSS returns same videos as API)

### `composables/useNewVideosAlert.ts`
- Reads RSS feed on app start
- Compares latest video ID against `lastSeenVideoId` stored in `localStorage`
- If new videos found → shows `<UToast>` "3 new sermons available" with action to go to Watch tab
- Updates `lastSeenVideoId` when user visits Watch tab
- Zero server needed — fully client-side via localStorage

### `composables/useOffline.ts`
- `isOffline: Ref<boolean>` — tracks `navigator.onLine` + `online`/`offline` events
- Used across all views to show the offline `<UAlert>` banner

## Visual Design

### Color Palette (from sample flyer)

| Role | Color | Hex |
|------|-------|-----|
| Primary | Navy | `#1a2a4a` |
| Primary | Teal | `#0077aa` |
| Primary | Cyan | `#00a8cc` |
| Primary | Sky | `#7ec8e3` |
| Accent | Gold | `#c9a84c` |
| Neutral | Cream | `#f5f0e1` |
| Neutral | White | `#ffffff` |
| Text | Black | `#222222` |

Configured as Tailwind theme colors and Nuxt UI `app.config.ts` tokens.

### Typography & Style
- Sans-serif, light theme only
- Watercolor-inspired CSS gradients (Hero background)
- Card-based content with `<UCard>`
- Centered symmetrical layouts

## Error & Edge Cases

| Scenario | Handling |
|----------|----------|
| YouTube RSS fetch fails | Try API fallback. If both fail: error + retry button |
| YouTube API quota exceeded | Show only RSS-loaded videos, disable "Load More" with message |
| YouTube API key not configured (dev) | Use only RSS feed, hide "Load More" |
| Network offline | Show cached content + `<UAlert>` banner |
| Facebook iframe blocked | Fallback: `<UButton>` "Follow us on Fountain of Life Facebook" link |
| No videos on channel | "Check back soon for new videos" placeholder |
| iOS install | Custom banner with instructions (no `beforeinstallprompt`) |
| Service worker update | Toast with reload prompt |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `VITE_YOUTUBE_API_KEY` | YouTube Data API v3 key (referrer-restricted in GCP) |
| `VITE_YOUTUBE_CHANNEL_ID` | `UCOAoHXW3nCre1EACIn-soIQ` |

## Deployment

- Vite build → `dist/` directory
- DO App Platform: static site, custom domain
- GitHub Actions: build on push → deploy to DO App Platform
- No server, no Docker, no database

## Out of Scope

- Backend / server of any kind
- Push notifications
- User accounts / auth
- CMS / content editing
- Events calendar
- Donations
- Dark mode
- Facebook Graph API
