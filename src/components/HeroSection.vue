<script setup lang="ts">
import LogoIcon from '@/components/LogoIcon.vue'
import { CHURCH_NAME, CHURCH_TAGLINE } from '@/data/churchInfo'
</script>

<template>
  <UPageHero
    :title="CHURCH_NAME"
    :description="CHURCH_TAGLINE"
    :ui="{
      wrapper: 'hero-gradient text-center',
      title: 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]',
      description: 'text-sky drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]',
    }"
  >
    <template #top>
      <LogoIcon class="mb-6 h-28 w-28 drop-shadow-lg md:h-36 md:w-36" />
    </template>
  </UPageHero>
</template>
