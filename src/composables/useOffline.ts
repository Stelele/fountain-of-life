import { ref, onMounted, onUnmounted } from 'vue'

export function useOffline() {
  const isOffline = ref(!navigator.onLine)

  function onOnline() {
    isOffline.value = false
  }

  function onOffline() {
    isOffline.value = true
  }

  onMounted(() => {
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
  })

  onUnmounted(() => {
    window.removeEventListener('online', onOnline)
    window.removeEventListener('offline', onOffline)
  })

  return { isOffline }
}
