<script setup lang="ts">
import LogoIcon from '@/components/LogoIcon.vue'
import { CHURCH_NAME } from '@/data/churchInfo'
</script>

<template>
  <UPageHero
    :title="CHURCH_NAME"
    :ui="{
      wrapper: 'bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-center',
      title: 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]',
    }"
  >
    <template #top>
      <LogoIcon class="mb-6 h-28 w-28 drop-shadow-lg md:h-36 md:w-36" />
    </template>
  </UPageHero>
</template>
