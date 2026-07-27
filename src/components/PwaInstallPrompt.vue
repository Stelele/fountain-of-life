<script setup lang="ts">
import { usePwaInstall } from '@/composables/usePwaInstall'

const { isInstallable, isIOS, install } = usePwaInstall()
</script>

<template>
  <UAlert
    v-if="isIOS"
    title="Install this app"
    description="Tap the Share button and select 'Add to Home Screen' to install Fountain of Life on your device."
    icon="i-lucide-download"
    color="primary"
    variant="subtle"
    class="mx-4 mt-2"
    :close-button="{ icon: 'i-lucide-x' }"
  />

  <UToast
    v-if="isInstallable"
    title="Install App"
    description="Add Fountain of Life to your home screen for quick access"
    icon="i-lucide-download"
    :timeout="30000"
    :actions="[{ label: 'Install', onClick: install }]"
  />
</template>
