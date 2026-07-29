# Fountain of Life UI Polish — Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the Fountain of Life church website from functional to polished by fixing Nuxt UI misuse, adding visual richness, improving accessibility, and incorporating design patterns observed from successful church websites (cozaglobal.org, heartfeltonline.org, ufiministries.org, celebrate.org) while maintaining the site's unique blue-to-cyan gradient and gold-accent identity anchored in the original flyer.

**Architecture:** Vue 3 SPA + Nuxt UI v4 + Tailwind v4. Zero backend. Fixes are frontend-only — new components, refactored existing components, and centralized theming.

**Tech Stack:** Vue 3, TypeScript, Nuxt UI v4, Tailwind v4, vite-plugin-pwa

---

## Phase 1: Theme & Layout Foundation

### Task 1: Create `app.config.ts` for centralized theme

**Files:**
- Create: `app.config.ts`

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'navy',
      secondary: 'gold',
      neutral: 'slate',
    },
    button: {
      default: {
        variant: 'solid',
        color: 'primary',
      },
    },
    badge: {
      default: {
        color: 'secondary',
        variant: 'solid',
      },
    },
    card: {
      slots: {
        root: 'shadow-sm',
      },
    },
    container: {
      constrained: 'max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl',
    },
  },
})
```

- [ ] **Step 1: Create `app.config.ts`** — write the file above
- [ ] **Step 2: Verify** — `npx vue-tsc --noEmit`
- [ ] **Step 3: Commit**

---

### Task 2: Extract `LogoIcon.vue` component (used 3× across codebase)

**Files:**
- Create: `src/components/LogoIcon.vue`
- Modify: `src/components/HeroSection.vue` — import and use LogoIcon
- Modify: `src/components/SiteNav.vue` — import and use LogoIcon

```vue
<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <svg :class="class" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fountain of Life Church Logo">
    <circle cx="60" cy="60" r="56" fill="#1a2a4a" stroke="#c9a84c" stroke-width="4" />
    <circle cx="60" cy="60" r="52" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.6" />
    <g transform="translate(60,44)">
      <line x1="0" y1="-22" x2="0" y2="18" stroke="#cc3333" stroke-width="6" stroke-linecap="round" />
      <line x1="-13" y1="-7" x2="13" y2="-7" stroke="#cc3333" stroke-width="6" stroke-linecap="round" />
    </g>
    <g transform="translate(60,68)">
      <path d="M-15,0 Q-10,-18 0,-15 Q10,-18 15,0" fill="none" stroke="#00a8cc" stroke-width="3" />
      <path d="M-25,3 Q-12,-8 0,-5 Q12,-8 25,3" fill="none" stroke="#7ec8e3" stroke-width="2.5" opacity="0.8" />
      <circle cx="0" cy="-5" r="1.5" fill="#7ec8e3" />
    </g>
  </svg>
</template>
```

- [ ] **Step 1: Create `LogoIcon.vue`**
- [ ] **Step 2: Replace inline SVG in `HeroSection.vue`** with `<LogoIcon class="mb-6 h-28 w-28 drop-shadow-lg md:h-36 md:w-36" />`
- [ ] **Step 3: Replace inline SVG in `SiteNav.vue` desktop header** with `<LogoIcon class="h-9 w-9" />`
- [ ] **Step 4: Verify** — `npx vue-tsc --noEmit`
- [ ] **Step 5: Commit**

---

### Task 3: Replace hand-rolled hero with `UPageHero`

**Files:**
- Modify: `src/components/HeroSection.vue`

```vue
<script setup lang="ts">
import LogoIcon from '@/components/LogoIcon.vue'
</script>

<template>
  <UPageHero
    title="Fountain of Life"
    description="Family in Christ"
    :ui="{
      wrapper: 'hero-gradient',
      title: 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]',
      description: 'text-sky drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]',
    }"
  >
    <template #top>
      <LogoIcon class="mb-6 h-28 w-28 drop-shadow-lg md:h-36 md:w-36" />
    </template>
  </UPageHero>
</template>
```

- [ ] **Step 1: Replace `HeroSection.vue`** with above
- [ ] **Step 2: Verify** — `npx vue-tsc --noEmit`
- [ ] **Step 3: Commit**

---

### Task 4: Add `UContainer` and `UPageHeader` to all views

**Files:**
- Modify: `src/App.vue` — replace raw `<main>` with `<UContainer>`
- Modify: `src/views/WatchView.vue` — remove manual padding, add `UPageHeader`
- Modify: `src/views/ConnectView.vue` — remove manual padding, add `UPageHeader`
- Modify: `src/views/AboutView.vue` — remove manual padding, add `UPageHeader`

**App.vue main section:**
```vue
<main class="flex-1 pb-24 sm:pb-28 lg:pb-8">
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</main>
```

**WatchView.vue (example pattern for all views):**
```vue
<template>
  <UPage>
    <UPageHeader
      title="Watch"
      description="Sermons, worship, and messages"
    />
    <UPageBody>
      <UAlert
        v-if="newVideoCount > 0"
        icon="i-lucide-video"
        :title="`${newVideoCount} new ${newVideoCount === 1 ? 'video' : 'videos'} available`"
        description="Check out the latest sermons"
        color="primary"
        variant="subtle"
        class="mb-4"
        :close-button="{ icon: 'i-lucide-x', onClick: () => (newVideoCount = 0) }"
      />
      <VideoGrid ... />
      <VideoPlayer ... />
    </UPageBody>
  </UPage>
</template>
```

- [ ] **Step 1: Replace `App.vue` main section** with UContainer approach
- [ ] **Step 2: Replace `WatchView.vue`** with UPage/UPageHeader/UPageBody pattern
- [ ] **Step 3: Replace `ConnectView.vue`** with same pattern
- [ ] **Step 4: Replace `AboutView.vue`** with same pattern
- [ ] **Step 5: Update `HomeView.vue`** welcome section to use UPageBody
- [ ] **Step 6: Verify** — `npx vue-tsc --noEmit` and visual check
- [ ] **Step 7: Commit**

---

## Phase 2: Bug Fixes & Accessibility

### Task 5: Fix `UToast` usage in PwaInstallPrompt

**Files:**
- Modify: `src/components/PwaInstallPrompt.vue`
- Modify: `src/composables/usePwaInstall.ts`

**PwaInstallPrompt.vue:**
```vue
<script setup lang="ts">
import { watch } from 'vue'
import { useToast } from '@nuxt/ui'
import { usePwaInstall } from '@/composables/usePwaInstall'

const toast = useToast()
const { isInstallable, isIOS, install } = usePwaInstall()

watch(isInstallable, (val) => {
  if (val) {
    toast.add({
      title: 'Install App',
      description: 'Add Fountain of Life to your home screen for quick access',
      icon: 'i-lucide-download',
      timeout: 30000,
      actions: [{ label: 'Install', onClick: install }],
    })
  }
})
</script>

<template>
  <UAlert
    v-if="isIOS"
    title="Install this app"
    description="Tap the Share button and select 'Add to Home Screen' to install Fountain of Life on your device."
    icon="i-lucide-download"
    color="primary"
    variant="subtle"
    class="mx-4 mt-2"
    :close-button="{ icon: 'i-lucide-x' }"
  />
</template>
```

- [ ] **Step 1: Update `PwaInstallPrompt.vue`** — remove inline UToast, use `useToast()` + `watch()`
- [ ] **Step 2: Verify** — `npx vue-tsc --noEmit`
- [ ] **Step 3: Commit**

---

### Task 6: Add keyboard accessibility to VideoCard

**Files:**
- Modify: `src/components/VideoCard.vue`

```vue
<UCard
  class="cursor-pointer overflow-hidden transition-transform hover:scale-[1.02]"
  :ui="{ body: 'p-0', header: 'p-0' }"
  role="button"
  tabindex="0"
  :aria-label="`Watch: ${video.title}`"
  @click="$emit('select', video)"
  @keydown.enter.prevent="$emit('select', video)"
  @keydown.space.prevent="$emit('select', video)"
>
```

- [ ] **Step 1: Update `VideoCard.vue`** — add `role`, `tabindex`, `aria-label`, keyboard handlers
- [ ] **Step 2: Verify** — `npx vue-tsc --noEmit`
- [ ] **Step 3: Commit**

---

### Task 7: Add ARIA labels and skip-to-content link

**Files:**
- Modify: `src/components/SiteNav.vue` — add aria-labels
- Modify: `src/App.vue` — add skip-to-content link

**App.vue skip-to-content (add before SiteNav):**
```vue
<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-[var(--color-navy)] focus:px-4 focus:py-2 focus:text-white">
  Skip to content
</a>
```

**main element (add id):**
```vue
<main id="main-content" class="flex-1 pb-24 sm:pb-28 lg:pb-8">
```

**SiteNav.vue (add aria-labels):**
```vue
<!-- Mobile bottom nav -->
<UNavigationMenu ... aria-label="Main navigation">

<!-- Desktop top header -->
<header aria-label="Site header">
  <ULink to="/" aria-label="Fountain of Life — Home">
    <LogoIcon class="h-9 w-9" />
    <span class="text-navy text-lg font-bold" aria-hidden="true">Fountain of Life</span>
  </ULink>
```

- [ ] **Step 1: Add skip-to-content link to `App.vue`**, add `id="main-content"` to `<main>`
- [ ] **Step 2: Add `aria-label` attributes to `SiteNav.vue`**
- [ ] **Step 3: Verify** — `npx vue-tsc --noEmit`
- [ ] **Step 4: Commit**

---

## Phase 3: Component Architecture

### Task 8: Extract `SocialLinkCard.vue` reusable component

**Files:**
- Create: `src/components/SocialLinkCard.vue`
- Modify: `src/components/FacebookFeed.vue` — use SocialLinkCard × 3

**SocialLinkCard.vue:**
```vue
<script setup lang="ts">
defineProps<{
  icon: string
  iconBgClass: string
  iconColorClass: string
  title: string
  description: string
  buttonLabel: string
  buttonIcon: string
  url: string
}>()
</script>

<template>
  <div class="flex items-start gap-4">
    <div :class="[iconBgClass, 'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full']">
      <UIcon :name="icon" :class="[iconColorClass, 'text-2xl']" />
    </div>
    <div>
      <p class="text-navy font-medium">{{ title }}</p>
      <p class="text-sm text-gray-500">{{ description }}</p>
      <UButton
        :icon="buttonIcon"
        :to="url"
        target="_blank"
        variant="outline"
        size="sm"
        class="mt-2"
      >
        {{ buttonLabel }}
      </UButton>
    </div>
  </div>
</template>
```

**FacebookFeed.vue (simplified):**
```vue
<script setup lang="ts">
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
        url="https://www.facebook.com/share/14ngyaWEezU/"
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
        url="https://www.youtube.com/channel/UCOAoHXW3nCre1EACIn-soIQ"
      />
      <USeparator />
      <SocialLinkCard
        icon="i-lucide-message-circle"
        icon-bg-class="bg-whatsapp/10"
        icon-color-class="text-whatsapp"
        title="Chat on WhatsApp"
        description="Send us a message, we'd love to hear from you"
        button-label="+263 77 314 7693"
        button-icon="i-lucide-message-circle"
        url="https://wa.me/263773147693"
      />
    </div>
  </UCard>
</template>
```

**style.css (add brand tokens):**
```css
@theme {
  /* existing tokens */
  --color-facebook: #1877F2;
  --color-youtube: #FF0000;
  --color-whatsapp: #25D366;
}
```

- [ ] **Step 1: Add brand tokens to `src/style.css`**
- [ ] **Step 2: Create `SocialLinkCard.vue`**
- [ ] **Step 3: Rewrite `FacebookFeed.vue`** using SocialLinkCard
- [ ] **Step 4: Verify** — `npx vue-tsc --noEmit`
- [ ] **Step 5: Commit**

---

### Task 9: Replace BeliefsSection text wall with `UAccordion`

**Files:**
- Modify: `src/components/BeliefsSection.vue`

```vue
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
      <h2 class="text-navy text-lg font-semibold">What We Believe</h2>
    </template>

    <UAccordion :items="beliefs" variant="ghost" />

    <template #footer>
      <div>
        <h3 class="mb-2 font-semibold text-navy">Our Vision</h3>
        <p class="text-sm leading-relaxed text-gray-700">
          To be a fountain of living water — a community where lives are transformed by the love
          of Christ, where believers grow in faith, and where we reach out with compassion to our
          city and beyond.
        </p>
      </div>
    </template>
  </UCard>
</template>
```

- [ ] **Step 1: Replace `BeliefsSection.vue`** with UAccordion-based version
- [ ] **Step 2: Verify** — `npx vue-tsc --noEmit`
- [ ] **Step 3: Commit**

---

### Task 10: Replace raw `<footer>` with `UFooter`

**Files:**
- Create: `src/components/AppFooter.vue`
- Modify: `src/views/HomeView.vue` — use AppFooter

**AppFooter.vue:**
```vue
<template>
  <footer class="mt-12 border-t border-gray-200 py-8">
    <div class="mx-auto max-w-5xl px-4">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div>
          <h3 class="mb-3 text-navy font-semibold">Fountain of Life</h3>
          <p class="text-sm text-gray-500">Family in Christ</p>
          <p class="mt-2 text-sm text-gray-500">Mark 1:15</p>
        </div>
        <div>
          <h3 class="mb-3 text-navy font-semibold">Service Times</h3>
          <div class="space-y-1 text-sm text-gray-500">
            <p>Sunday — 9:00 AM & 5:00 PM</p>
            <p>Wednesday — 6:00 PM</p>
            <p>Friday — 6:00 PM</p>
          </div>
        </div>
        <div>
          <h3 class="mb-3 text-navy font-semibold">Connect</h3>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2 text-gray-500">
              <UIcon name="i-lucide-map-pin" class="text-navy text-sm" />
              <span>Palace Hotel, Harare</span>
            </div>
            <div class="flex items-center gap-2 text-gray-500">
              <UIcon name="i-lucide-phone" class="text-navy text-sm" />
              <span>+263 77 314 7693</span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-facebook" class="text-navy text-sm" />
              <ULink
                to="https://www.facebook.com/share/14ngyaWEezU/"
                target="_blank"
                class="text-cyan hover:underline"
              >
                Facebook
              </ULink>
            </div>
          </div>
        </div>
      </div>
      <p class="mt-8 text-center text-xs text-gray-400">Fountain of Life Family in Christ</p>
    </div>
  </footer>
</template>
```

- [ ] **Step 1: Create `AppFooter.vue`**
- [ ] **Step 2: Replace raw footer in `HomeView.vue`** with `<AppFooter />`
- [ ] **Step 3: Verify** — `npx vue-tsc --noEmit`
- [ ] **Step 4: Commit**

---

### Task 11: Standardize color usage across all components

**Files:**
- All component and view files — find and replace `var(--color-navy)` → use Tailwind classes

Replace patterns:
- `text-[var(--color-navy)]` → `text-navy`
- `text-[var(--color-cyan)]` → `text-cyan`
- `text-gray-500` → `text-neutral-500`
- `border-gray-200` → `border-neutral-200`

- [ ] **Step 1: Run replacements across all `.vue` files in `src/`** — search for `var(--color-` and replace with Tailwind utility class
- [ ] **Step 2: Verify** — `npx vue-tsc --noEmit`
- [ ] **Step 3: Commit**

---

## Phase 4: Home Page Enrichment

### Task 12: Add Events/Special Services section to Home

**Files:**
- Create: `src/components/EventsSection.vue`
- Modify: `src/views/HomeView.vue` — add EventsSection

```vue
<script setup lang="ts">
const events = [
  { title: 'Catch The Fire 2026', date: 'Coming Soon', description: 'Join us for a powerful conference of worship and the Word' },
  { title: 'Sunday Worship', date: 'Every Sunday 9AM & 5PM', description: 'Experience God\'s presence in our weekly worship services' },
  { title: 'Prayer Meeting', date: 'Every Friday 6PM', description: 'A time of corporate prayer and intercession' },
]
</script>

<template>
  <UCard class="mx-4 mt-8 sm:mx-8 md:mx-16">
    <template #header>
      <h2 class="text-navy text-xl font-semibold">Upcoming Events</h2>
    </template>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <UCard v-for="event in events" :key="event.title" variant="subtle">
        <UBadge variant="subtle" color="primary" class="mb-2">{{ event.date }}</UBadge>
        <h3 class="text-navy font-semibold">{{ event.title }}</h3>
        <p class="mt-1 text-sm text-gray-500">{{ event.description }}</p>
      </UCard>
    </div>
  </UCard>
</template>
```

- [ ] **Step 1: Create `EventsSection.vue`**
- [ ] **Step 2: Add `<EventsSection />` to `HomeView.vue`** between welcome text and footer
- [ ] **Step 3: Verify visually and type-check**
- [ ] **Step 4: Commit**

---

### Task 13: Add Testimonials section to Home

**Files:**
- Create: `src/components/TestimonialsSection.vue`
- Modify: `src/views/HomeView.vue` — add TestimonialsSection

```vue
<script setup lang="ts">
const testimonials = [
  { quote: 'God has truly transformed my life through the teachings I receive here.', author: 'Member' },
  { quote: 'I found a family and a place to grow spiritually.', author: 'Member' },
  { quote: 'The Word preached here has changed my perspective on life.', author: 'Member' },
]
</script>

<template>
  <div class="mx-4 mt-8 sm:mx-8 md:mx-16">
    <h2 class="mb-4 text-center text-navy text-xl font-semibold md:text-2xl">What People Are Saying</h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <UCard v-for="item in testimonials" :key="item.quote" class="text-center">
        <UIcon name="i-lucide-quote" class="mx-auto mb-2 text-gold text-2xl" />
        <p class="text-sm italic text-gray-600">"{{ item.quote }}"</p>
        <p class="mt-2 text-xs font-medium text-navy">— {{ item.author }}</p>
      </UCard>
    </div>
  </div>
</template>
```

- [ ] **Step 1: Create `TestimonialsSection.vue`**
- [ ] **Step 2: Add `<TestimonialsSection />` to `HomeView.vue`**
- [ ] **Step 3: Verify visually and type-check**
- [ ] **Step 4: Commit**

---

### Task 14: Add Newsletter signup section to Home

**Files:**
- Create: `src/components/NewsletterSection.vue`
- Modify: `src/views/HomeView.vue` — add NewsletterSection

```vue
<template>
  <div class="hero-gradient mx-4 mt-8 rounded-xl px-6 py-10 text-center sm:mx-8 md:mx-16">
    <h2 class="mb-2 text-white text-xl font-bold md:text-2xl">Stay Connected</h2>
    <p class="mb-6 text-sky text-sm md:text-base">
      Join our community and receive updates on sermons, events, and more
    </p>
    <div class="mx-auto flex max-w-md gap-2">
      <UInput placeholder="Your email address" class="flex-1" />
      <UButton color="secondary">Subscribe</UButton>
    </div>
  </div>
</template>
```

- [ ] **Step 1: Create `NewsletterSection.vue`**
- [ ] **Step 2: Add `<NewsletterSection />` to `HomeView.vue`**
- [ ] **Step 3: Verify visually and type-check**
- [ ] **Step 4: Commit**

---

## Phase 5: Final Polish & Verification

### Task 15: Bottom nav semantic fix (mobile)

**Files:**
- Modify: `src/components/SiteNav.vue` — mobile section

Replace mobile UNavigationMenu with proper tab bar:
```vue
<!-- Mobile: bottom tab bar -->
<nav
  role="tablist"
  aria-label="Main navigation"
  class="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white lg:hidden"
  :style="{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }"
>
  <div class="mx-auto flex max-w-lg justify-around">
    <UButton
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      :icon="item.icon"
      variant="ghost"
      color="neutral"
      class="flex-col gap-0.5 px-4 py-2"
      role="tab"
      :aria-selected="isActive(item.to)"
      :class="isActive(item.to) ? 'text-navy' : 'text-gray-400'"
    >
      <span class="text-[11px]">{{ item.label }}</span>
    </UButton>
  </div>
</nav>
```

- [ ] **Step 1: Update mobile section in `SiteNav.vue`** — replace UNavigationMenu with UButton-based tab bar
- [ ] **Step 2: Add `isActive` logic** using `useRoute()`
- [ ] **Step 3: Verify visually** on mobile and desktop
- [ ] **Step 4: Commit**

---

### Task 16: Final verification

- [ ] **Step 1: Type-check**
```bash
npx vue-tsc --noEmit
```

- [ ] **Step 2: Production build**
```bash
npm run build
```

- [ ] **Step 3: Visual test** — `npm run dev` and check:
  - Home page: hero, events, testimonials, newsletter, footer
  - Watch page: video grid, modal playback, load more
  - Connect page: social link cards
  - About page: accordion beliefs, table, contact
  - Mobile: bottom tab bar works, no overlaps
  - Desktop: top nav works, content fills width appropriately
  - Keyboard: Tab through VideoCard, check skip-to-content
  - PWA: install toast appears on Android

- [ ] **Step 4: Commit final state**
