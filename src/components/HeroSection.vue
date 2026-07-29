<script setup lang="ts">
import { CHURCH_NAME } from '@/data/churchInfo'
</script>

<template>
  <UPageHero :title="CHURCH_NAME" :ui="{
    wrapper: 'text-center bg-primary-400 backdrop-blur-sm py-12',
    title: 'text-inverted drop-shadow-[0_2px_4px_var(--ui-color-neutral-900)]',
    headline: 'text-primary-300',
  }">
    <template #top>
      <img src="/logo.png" alt="Fountain of Life Church Logo"
        class="mx-auto h-24 w-24 drop-shadow-lg md:h-28 md:w-28" />
    </template>
  </UPageHero>
</template>
