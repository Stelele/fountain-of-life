<script setup lang="ts">
import { WHATSAPP_GROUP_URL, FACEBOOK_URL, YOUTUBE_CHANNEL_URL, WHATSAPP_DISPLAY } from '@/data/churchInfo'
import SocialLinkCard from '@/components/SocialLinkCard.vue'
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-highlighted text-lg font-semibold">Connect With Us</h2>
    </template>

    <div class="space-y-6 py-4">
      <SocialLinkCard
        icon="i-lucide-facebook"
        icon-bg-class="bg-primary/10"
        icon-color-class="text-primary"
        title="Follow us on Facebook"
        description="Stay updated with sermons, events, and community news"
        button-label="Open Facebook"
        button-icon="i-lucide-external-link"
        :url="FACEBOOK_URL"
      />

      <USeparator />

      <SocialLinkCard
        icon="i-lucide-play"
        icon-bg-class="bg-primary/10"
        icon-color-class="text-primary"
        title="Watch on YouTube"
        description="Subscribe for sermons, worship, and messages"
        button-label="Open YouTube"
        button-icon="i-lucide-external-link"
        :url="YOUTUBE_CHANNEL_URL"
      />

      <USeparator />

      <SocialLinkCard
        icon="i-lucide-message-circle"
        icon-bg-class="bg-primary/10"
        icon-color-class="text-primary"
        title="Join our WhatsApp Group"
        description="Daily devotion, prayer requests, and church updates"
        button-label="Join Group"
        button-icon="i-lucide-message-circle"
        :url="WHATSAPP_GROUP_URL"
      />
    </div>
  </UCard>
</template>
