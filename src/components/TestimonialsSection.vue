<script setup lang="ts">
const testimonials = [
  { quote: 'The teaching here has truly transformed my understanding of the Word.', author: 'Tendai M.', location: 'Harare' },
  { quote: 'I found not just a church, but a family that genuinely cares.', author: 'Ruvimbo C.', location: 'Borrowdale' },
  { quote: 'Every service leaves me encouraged, challenged, and closer to God.', author: 'Tafadzwa N.', location: 'Waterfalls' },
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
