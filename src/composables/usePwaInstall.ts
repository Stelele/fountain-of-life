import { ref, onMounted, onUnmounted } from 'vue'

export function usePwaInstall() {
  const deferredPrompt = ref<any>(null)
  const isInstallable = ref(false)
  const isIOS = ref(false)

  function handleBeforeInstallPrompt(e: Event) {
    e.preventDefault()
    deferredPrompt.value = e
    isInstallable.value = true
  }

  onMounted(() => {
    const ua = navigator.userAgent || ''
    isIOS.value = /iPad|iPhone|iPod/.test(ua) ||
      (navigator.maxTouchPoints > 1 && /Mac/.test(ua))

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  })

  onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  })

  async function install(): Promise<void> {
    if (deferredPrompt.value) {
      deferredPrompt.value.prompt()
      const { outcome } = await deferredPrompt.value.userChoice
      deferredPrompt.value = null
      isInstallable.value = false
      return outcome
    }
  }

  return { isInstallable, isIOS, install }
}
