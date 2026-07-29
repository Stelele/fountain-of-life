import { ref, onMounted, onUnmounted } from 'vue'

export function usePwaInstall() {
  const deferredPrompt = ref<any>(null)
  const isInstallable = ref(false)
  const isIOS = ref(false)
  const isStandalone = ref(false)
  const isDismissed = ref(false)

  function handleInstallable() {
    deferredPrompt.value = (window as any).__pwaDeferredPrompt
    isInstallable.value = true
  }

  onMounted(() => {
    const ua = navigator.userAgent || ''
    isIOS.value = /iPad|iPhone|iPod/.test(ua) ||
      (navigator.maxTouchPoints > 1 && /Mac/.test(ua))

    isStandalone.value = window.matchMedia('(display-mode: standalone)').matches

    isDismissed.value = localStorage.getItem('pwa_dismissed') === 'true'

    if ((window as any).__pwaDeferredPrompt) {
      handleInstallable()
    }

    window.addEventListener('pwa-installable', handleInstallable)
  })

  onUnmounted(() => {
    window.removeEventListener('pwa-installable', handleInstallable)
  })

  function dismiss() {
    isDismissed.value = true
    localStorage.setItem('pwa_dismissed', 'true')
  }

  async function install(): Promise<string | void> {
    if (deferredPrompt.value) {
      deferredPrompt.value.prompt()
      const { outcome } = await deferredPrompt.value.userChoice
      deferredPrompt.value = null
      isInstallable.value = false
      ;(window as any).__pwaDeferredPrompt = null
      if (outcome === 'accepted') {
        dismiss()
      }
      return outcome
    }
  }

  return { isInstallable, isIOS, isStandalone, isDismissed, install, dismiss }
}
