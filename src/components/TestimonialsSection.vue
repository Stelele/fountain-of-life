<script setup lang="ts">
const testimonials = [
  { quote: 'My faith has been revived by the testimonies and word hit deep that my life will never be the same again', author: 'Mai Murove', location: 'Mahatshula' },
  { quote: 'The service and word transformed my life and continues to bring me closer to God.', author: 'Patience. S', location: 'Mpilo' },
  { quote: 'l unlearn and learn new things everytime. The teachings, revelations and wisdom are helping me to be a better person each day', author: 'Mrs Muchena', location: 'Bulawayo' },
]
</script>

<template>
  <div class="bg-muted py-10">
    <div class="mx-4 sm:mx-8 md:mx-16">
      <h2 class="mb-2 text-center text-highlighted text-xl font-semibold md:text-2xl">What People Are Saying</h2>
      <p class="mb-6 text-center text-sm text-zinc-500">Hear from our church family</p>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <UCard v-for="item in testimonials" :key="item.quote" class="text-center bg-default">
          <UIcon name="i-lucide-quote" class="mx-auto mb-2 text-primary-500 text-2xl" />
          <p class="text-sm italic text-zinc-500">"{{ item.quote }}"</p>
          <p class="mt-2 text-xs font-medium text-highlighted">— {{ item.author }}</p>
          <p class="text-xs text-zinc-400">{{ item.location }}</p>
        </UCard>
      </div>
    </div>
  </div>
</template>
