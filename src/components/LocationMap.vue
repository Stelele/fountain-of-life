<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { CHURCH_ADDRESS, CHURCH_LAT, CHURCH_LNG } from '@/data/churchInfo'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${CHURCH_LAT},${CHURCH_LNG}`

onMounted(() => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value, {
    center: [CHURCH_LAT, CHURCH_LNG],
    zoom: 16,
    zoomControl: true,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map)

  const marker = L.marker([CHURCH_LAT, CHURCH_LNG]).addTo(map)

  marker.bindPopup(
    `<div class="leaflet-popup-content-wrapper">
      <strong>${CHURCH_ADDRESS}</strong>
      <br />
      <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer">
        Get Directions ↗
      </a>
    </div>`,
  )

  marker.openPopup()

  setTimeout(() => {
    map?.invalidateSize()
  }, 200)
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-highlighted text-lg font-semibold">Location</h2>
    </template>
    <div ref="mapContainer" class="aspect-video w-full overflow-hidden rounded-lg" />
    <p class="mt-3 text-sm text-zinc-500">{{ CHURCH_ADDRESS }}</p>
  </UCard>
</template>
