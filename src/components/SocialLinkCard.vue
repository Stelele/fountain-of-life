<script setup lang="ts">
defineProps<{
  icon: string
  iconBgClass: string
  iconColorClass: string
  title: string
  description: string
  buttonLabel: string
  buttonIcon: string
  url: string
}>()
</script>

<template>
  <div class="flex items-start gap-4">
    <div :class="[iconBgClass, 'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full']">
      <UIcon :name="icon" :class="[iconColorClass, 'text-2xl']" />
    </div>
    <div>
      <p class="text-highlighted font-medium">{{ title }}</p>
      <p class="text-sm text-neutral-500">{{ description }}</p>
      <UButton
        :icon="buttonIcon"
        :to="url"
        target="_blank"
        rel="noopener noreferrer"
        variant="outline"
        size="sm"
        class="mt-2"
      >
        {{ buttonLabel }}
      </UButton>
    </div>
  </div>
</template>
