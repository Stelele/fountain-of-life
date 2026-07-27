<template>
  <UCard>
    <template #header>
      <h2 class="text-[var(--color-navy)] text-lg font-semibold">Connect With Us</h2>
    </template>

    <div class="space-y-6 py-4">
      <div class="flex items-start gap-4">
        <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1877F2]/10">
          <UIcon name="i-lucide-facebook" class="text-2xl text-[#1877F2]" />
        </div>
        <div>
          <p class="font-medium text-[var(--color-navy)]">Follow us on Facebook</p>
          <p class="text-sm text-gray-500">Stay updated with sermons, events, and community news</p>
          <UButton
            icon="i-lucide-external-link"
            to="https://www.facebook.com/share/14ngyaWEezU/"
            target="_blank"
            variant="outline"
            size="sm"
            class="mt-2"
          >
            Open Facebook Page
          </UButton>
        </div>
      </div>

      <USeparator />

      <div class="flex items-start gap-4">
        <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FF0000]/10">
          <UIcon name="i-lucide-play" class="text-2xl text-[#FF0000]" />
        </div>
        <div>
          <p class="font-medium text-[var(--color-navy)]">Watch on YouTube</p>
          <p class="text-sm text-gray-500">Subscribe for sermons, worship, and messages</p>
          <UButton
            icon="i-lucide-external-link"
            to="https://www.youtube.com/channel/UCOAoHXW3nCre1EACIn-soIQ"
            target="_blank"
            variant="outline"
            size="sm"
            class="mt-2"
          >
            Open YouTube Channel
          </UButton>
        </div>
      </div>

      <USeparator />

      <div class="flex items-start gap-4">
        <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)]/10">
          <UIcon name="i-lucide-phone" class="text-2xl text-[var(--color-navy)]" />
        </div>
        <div>
          <p class="font-medium text-[var(--color-navy)]">Chat on WhatsApp</p>
          <p class="text-sm text-gray-500">Send us a message, we'd love to hear from you</p>
          <UButton
            icon="i-lucide-message-circle"
            to="https://wa.me/263773147693"
            target="_blank"
            variant="outline"
            size="sm"
            class="mt-2"
          >
            +263 77 314 7693
          </UButton>
        </div>
      </div>
    </div>
  </UCard>
</template>
