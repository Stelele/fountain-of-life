<script setup lang="ts">
import { usePwaInstall } from '@/composables/usePwaInstall'

const { isInstallable, isIOS, isStandalone, isDismissed, install, dismiss } = usePwaInstall()

function handleInstall() {
  install()
}
</script>

<template>
  <UAlert
    v-if="isIOS && !isStandalone && !isDismissed"
    title="Install this app"
    description="Tap the Share button and select 'Add to Home Screen' to install Fountain of Life on your device."
    icon="i-lucide-download"
    color="primary"
    variant="subtle"
    class="mx-4 mt-2"
    :ui="{ title: 'text-gray-900 dark:text-gray-100', description: 'text-gray-700 dark:text-gray-300', icon: 'text-amber-600 dark:text-amber-400' }"
  >
    <template #close>
      <UButton icon="i-lucide-x" color="neutral" variant="link" @click="dismiss" />
    </template>
  </UAlert>

  <UAlert
    v-if="isInstallable && !isStandalone && !isDismissed"
    title="Install App"
    description="Add Fountain of Life to your home screen for quick access"
    icon="i-lucide-download"
    color="primary"
    variant="subtle"
    orientation="horizontal"
    class="mx-4 mt-2"
    :ui="{ title: 'text-gray-900 dark:text-gray-100', description: 'text-gray-700 dark:text-gray-300', icon: 'text-amber-600 dark:text-amber-400' }"
    :actions="[{ label: 'Install', color: 'neutral', variant: 'solid', onClick: handleInstall }]"
  >
    <template #close>
      <UButton icon="i-lucide-x" color="neutral" variant="link" @click="dismiss" />
    </template>
  </UAlert>
</template>
