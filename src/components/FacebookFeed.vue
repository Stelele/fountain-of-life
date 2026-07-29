<script setup lang="ts">
import { WHATSAPP_URL, FACEBOOK_URL, YOUTUBE_CHANNEL_URL, WHATSAPP_DISPLAY } from '@/data/churchInfo'
import SocialLinkCard from '@/components/SocialLinkCard.vue'
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-navy text-lg font-semibold">Connect With Us</h2>
    </template>

    <div class="space-y-6 py-4">
      <SocialLinkCard
        icon="i-lucide-facebook"
        icon-bg-class="bg-facebook/10"
        icon-color-class="text-facebook"
        title="Follow us on Facebook"
        description="Stay updated with sermons, events, and community news"
        button-label="Open Facebook"
        button-icon="i-lucide-external-link"
        :url="FACEBOOK_URL"
      />

      <USeparator />

      <SocialLinkCard
        icon="i-lucide-play"
        icon-bg-class="bg-youtube/10"
        icon-color-class="text-youtube"
        title="Watch on YouTube"
        description="Subscribe for sermons, worship, and messages"
        button-label="Open YouTube"
        button-icon="i-lucide-external-link"
        :url="YOUTUBE_CHANNEL_URL"
      />

      <USeparator />

      <SocialLinkCard
        icon="i-lucide-message-circle"
        icon-bg-class="bg-whatsapp/10"
        icon-color-class="text-whatsapp"
        title="Chat on WhatsApp"
        description="Send us a message, we'd love to hear from you"
        :button-label="WHATSAPP_DISPLAY"
        button-icon="i-lucide-message-circle"
        :url="WHATSAPP_URL"
      />
    </div>
  </UCard>
</template>
