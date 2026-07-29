<script setup lang="ts">
const beliefs = [
  {
    label: 'God',
    content: 'We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
  {
    label: 'The Bible',
    content: 'We believe the Bible is the inspired and authoritative Word of God, our guide for faith and daily living.',
  },
  {
    label: 'Jesus Christ',
    content: 'We believe in the deity of our Lord Jesus Christ, His virgin birth, His sinless life, His atoning death on the cross, His bodily resurrection, and His coming return.',
  },
  {
    label: 'Salvation',
    content: 'We believe that all have sinned and fall short of the glory of God, and that salvation is found only through faith in Jesus Christ.',
  },
]
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-highlighted text-lg font-semibold">What We Believe</h2>
    </template>

    <UAccordion :items="beliefs" />

    <template #footer>
      <div>
        <h3 class="mb-2 font-semibold text-highlighted">Our Vision</h3>
        <p class="text-sm leading-relaxed text-zinc-500">
          To be a fountain of living water — a community where lives are transformed by the love
          of Christ, where believers grow in faith, and where we reach out with compassion to our
          city and beyond.
        </p>
      </div>
    </template>
  </UCard>
</template>
