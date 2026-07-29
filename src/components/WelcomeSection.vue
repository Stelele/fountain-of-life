<script setup lang="ts">
defineEmits<{
  openVisitor: []
}>()
</script>

<template>
  <UPageSection
    headline="Welcome — We're glad you're here!"
    description="We are delighted that you have chosen to worship with us today. At Fountain of Life Family in Christ, we are a Bible-believing church and a Holy Spirit-led family. We believe that church is more than a place to attend — it is a place to encounter God, experience His love, and grow in your relationship with Jesus Christ."
    :features="[
      { title: 'The Word of God', icon: 'i-lucide-book-open', description: '' },
      { title: 'Prophecy', icon: 'i-lucide-flame', description: '' },
      { title: 'Deliverance', icon: 'i-lucide-shield-check', description: '' },
      { title: 'Healing', icon: 'i-lucide-heart-pulse', description: '' },
    ]"
  >
    <template #headline>
      <p class="text-center text-highlighted text-sm font-bold uppercase tracking-wider">In His Presence You Will Experience</p>
    </template>

    <UCard
      variant="subtle"
      class="mx-auto mt-8 max-w-sm cursor-pointer border-2 border-dashed border-primary-500/50 bg-primary-500/5 transition-colors hover:bg-primary-500/10"
      @click="$emit('openVisitor')"
    >
      <div class="text-center">
        <UIcon name="i-lucide-heart-handshake" class="mx-auto mb-3 text-primary-500 text-3xl" />
        <h3 class="mb-1 text-highlighted font-semibold">First time visiting?</h3>
        <p class="mb-4 text-sm text-zinc-500">We'd love to know you're coming. Fill out a quick card so we can welcome you personally.</p>
        <UButton icon="i-lucide-pencil-line" color="secondary" size="lg" block>
          Fill Visitor Card
        </UButton>
      </div>
    </UCard>
  </UPageSection>
</template>
