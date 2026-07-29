<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { WHATSAPP_URL } from '@/data/churchInfo'

const open = defineModel<boolean>('open', { required: true })
const submitted = ref(false)

const state = reactive({
  name: '',
  phone: '',
  gender: '',
  address: '',
  comment: '',
})

function reset(): void {
  state.name = ''
  state.phone = ''
  state.gender = ''
  state.address = ''
  state.comment = ''
}

function onSubmit(event: FormSubmitEvent<any>): void {
  const message = [
    '*New Visitor Card*',
    `*Name:* ${state.name}`,
    `*Phone:* ${state.phone}`,
    `*Gender:* ${state.gender || '-'}`,
    `*Address:* ${state.address || '-'}`,
    `*Comment:* ${state.comment || '-'}`,
    '',
    '_Submitted via fountainoflifefamily.com_',
  ].join('\n')

  submitted.value = true
  window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank')

  setTimeout(() => {
    reset()
    submitted.value = false
  }, 3000)
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Visitor Card"
    description="We'd love to welcome you personally"
    :ui="{ overlay: 'bg-zinc-950/70 backdrop-blur-sm', content: 'bg-default' }"
  >
    <template #body>
      <div v-if="submitted" class="flex flex-col items-center gap-4 py-8 text-center">
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/10">
          <UIcon name="i-lucide-check-circle" class="text-primary-500 text-4xl" />
        </div>
        <p class="text-highlighted text-lg font-semibold">Thank you — We're glad you're here!</p>
        <p class="text-sm text-zinc-500">Opening WhatsApp with your details so we can connect.</p>
      </div>

      <UForm
        v-else
        id="visitor-form"
        :state="state"
        class="space-y-5"
        @submit="onSubmit"
      >
        <UFormField name="name" label="Name" required>
          <UInput v-model="state.name" placeholder="Your full name" class="w-full" />
        </UFormField>

        <UFormField name="phone" label="Phone" required>
          <UInput v-model="state.phone" type="tel" placeholder="+263 77 123 4567" class="w-full" />
        </UFormField>

        <UFormField name="gender" label="Gender" hint="Optional">
          <USelect v-model="state.gender" :items="['Male', 'Female']" placeholder="Select..." class="w-full" />
        </UFormField>

        <UFormField name="address" label="Address" hint="Optional">
          <UInput v-model="state.address" placeholder="Where you stay" class="w-full" />
        </UFormField>

        <UFormField name="comment" label="Prayer Request / Comment" hint="Optional">
          <UTextarea
            v-model="state.comment"
            placeholder="Anything you'd like us to pray about..."
            :rows="3"
            autoresize
            :maxrows="6"
            class="w-full"
          />
        </UFormField>
      </UForm>
    </template>

    <template #footer="{ close }">
      <div v-if="!submitted" class="flex w-full items-center justify-between">
        <UButton variant="ghost" color="neutral" @click="close">Cancel</UButton>
        <UButton type="submit" form="visitor-form" color="secondary" size="lg">
          Submit Card
        </UButton>
      </div>
    </template>
  </UModal>
</template>
