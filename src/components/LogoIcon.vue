<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <svg
    :class="class"
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Fountain of Life Church Logo"
  >
    <circle cx="60" cy="60" r="56" fill="#854d0e" stroke="#eab308" stroke-width="4" />
    <circle cx="60" cy="60" r="52" fill="none" stroke="#eab308" stroke-width="1" opacity="0.6" />
    <g transform="translate(60,44)">
      <line x1="0" y1="-22" x2="0" y2="18" stroke="#cc3333" stroke-width="6" stroke-linecap="round" />
      <line x1="-13" y1="-7" x2="13" y2="-7" stroke="#cc3333" stroke-width="6" stroke-linecap="round" />
    </g>
    <g transform="translate(60,68)">
      <path d="M-15,0 Q-10,-18 0,-15 Q10,-18 15,0" fill="none" stroke="#a16207" stroke-width="3" />
      <path d="M-25,3 Q-12,-8 0,-5 Q12,-8 25,3" fill="none" stroke="#eab308" stroke-width="2.5" opacity="0.8" />
      <circle cx="0" cy="-5" r="1.5" fill="#eab308" />
    </g>
  </svg>
</template>
