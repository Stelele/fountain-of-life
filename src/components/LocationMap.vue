<template>
  <UCard>
    <template #header>
      <h2 class="text-[var(--color-navy)] text-lg font-semibold">Location</h2>
    </template>
    <div class="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=30.95,-17.85,31.05,-17.75&layer=mapnik"
        width="100%"
        height="100%"
        class="border-none"
        loading="lazy"
        title="Church location map"
      />
    </div>
    <p class="mt-3 text-sm text-gray-500">Palace Hotel, Conference Room — First Floor, Harare</p>
  </UCard>
</template>
