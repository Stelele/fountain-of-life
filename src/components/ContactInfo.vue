<template>
  <UCard>
    <template #header>
      <h2 class="text-[var(--color-navy)] text-lg font-semibold">Contact Us</h2>
    </template>
    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-map-pin" class="text-[var(--color-navy)] text-xl" />
        <div>
          <p class="text-sm font-medium">Palace Hotel, Conference Room</p>
          <p class="text-sm text-gray-500">First Floor, Harare</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-message-circle" class="text-[var(--color-navy)] text-xl" />
        <a href="https://wa.me/263773147693" target="_blank" class="text-sm text-[var(--color-cyan)] hover:underline">+263 77 314 7693</a>
      </div>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-mail" class="text-[var(--color-navy)] text-xl" />
        <a href="mailto:info@fountainoflife.org" class="text-sm text-[var(--color-cyan)] hover:underline">info@fountainoflife.org</a>
      </div>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-facebook" class="text-[var(--color-navy)] text-xl" />
        <a
          href="https://www.facebook.com/share/14ngyaWEezU/"
          target="_blank"
          class="text-sm text-[var(--color-cyan)] hover:underline"
        >
          Facebook Page
        </a>
      </div>
    </div>
  </UCard>
</template>
