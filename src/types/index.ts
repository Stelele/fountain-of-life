export interface Video {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  url: string
}

export interface ServiceTime {
  day: string
  time: string
  description: string
}

export interface ChurchInfo {
  name: string
  tagline: string
  address: string
  phone: string
  email: string
  facebookUrl: string
  youtubeChannelId: string
  serviceTimes: ServiceTime[]
  beliefsTitle: string
  beliefsBody: string
}
