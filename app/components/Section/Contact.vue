<template>
  <AppSection id="contact" title="Start a project">
    <div
      class="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-start gap-8"
    >
      <InvisibleCaptcha
        v-model:response="captchaResponse"
        v-model:error="captchaError"
        class="rounded-[4px] border border-neutral-800 bg-surface p-[clamp(20px,5vw,32px)]"
        notice-class="mt-[18px] text-xs leading-[1.5] text-neutral-500"
      >
        <UForm
          :schema="formSchema"
          :state="formData"
          class="flex flex-col gap-[18px]"
          @submit="onSubmit"
        >
          <UFormField label="Name" name="name" :ui="FIELD_UI">
            <UInput
              v-model="formData.name"
              autocomplete="name"
              placeholder="Jane Doe"
              class="w-full"
              :ui="{ base: INPUT_CLASS }"
            />
          </UFormField>
          <UFormField label="Email" name="email" required :ui="FIELD_UI">
            <UInput
              v-model="formData.email"
              type="email"
              autocomplete="email"
              placeholder="jane@company.com"
              class="w-full"
              :ui="{ base: INPUT_CLASS }"
            />
          </UFormField>
          <UFormField label="Message" name="message" required :hint="counter" :ui="FIELD_UI">
            <UTextarea
              v-model="formData.message"
              :rows="7"
              placeholder="What are you trying to build, and what is in the way?"
              class="w-full"
              :ui="{ base: `resize-y leading-[1.55] ${INPUT_CLASS}` }"
            />
          </UFormField>
          <UTooltip
            text="Email module is not initialized"
            :disabled="emailjs.isInitialized.value"
            :content="{ side: 'top' }"
          >
            <UButton
              type="submit"
              label="Send message"
              block
              :disabled="!emailjs.isInitialized.value || !captchaResponse"
              class="rounded-[4px] px-[22px] py-[15px] text-base font-semibold"
            />
          </UTooltip>
        </UForm>
        <template #notice>Protected by reCAPTCHA.</template>
      </InvisibleCaptcha>

      <div class="overflow-hidden rounded-[4px] border border-neutral-800">
        <div class="bg-surface p-[clamp(20px,5vw,32px)]">
          <p class="font-mono text-[11px] tracking-[0.08em] text-neutral-500 uppercase">
            Or skip the form
          </p>
          <ULink
            :to="`mailto:${contactEmail}`"
            raw
            class="mt-3 inline-block text-[clamp(20px,2.6vw,30px)] font-bold tracking-[-0.02em] break-words text-frite-400"
          >
            {{ contactEmail }}
          </ULink>
          <p class="mt-4 text-[15px] leading-[1.6] text-neutral-400">
            Based in Brussels. Write in French, English or Spanish. A two-line brief is enough to
            start.
          </p>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<script lang="ts" setup>
import * as z from "zod"
import type { FormSubmitEvent } from "@nuxt/ui"
import { AlertModal } from "#components"

const MESSAGE_MIN = 60
const MESSAGE_MAX = 600
const SUBMIT_COOLDOWN_MS = 60000

const FIELD_UI = {
  label:
    "font-mono text-[11px] font-normal tracking-[0.08em] text-neutral-400 uppercase after:text-frite-400",
  hint: "font-mono text-[11px] text-neutral-500",
  container: "mt-[7px]",
}
const INPUT_CLASS =
  "rounded-[4px] bg-neutral-950 px-3.5 py-[13px] text-base text-neutral-100 ring-neutral-800 placeholder:text-neutral-600 focus-visible:outline-0 focus-visible:ring-frite-400"

const emailjs = useEmailJS()
const toast = useToast()
const alertModal = useOverlay().create(AlertModal)
const contactEmail = useRuntimeConfig().public.contactFormToEmail

const formSchema = z.object({
  name: z.string().optional(),
  email: z.email("Invalid email format"),
  message: z
    .string()
    .min(MESSAGE_MIN, "This is interesting! Please, tell me more.")
    .max(MESSAGE_MAX, "Well, that's very long. Could you summarize it, or email me directly?"),
})
type FormSchema = z.output<typeof formSchema>

const formData = reactive<Partial<FormSchema>>({})
const captchaResponse = ref("")
const captchaError = ref(false)
let lastSubmittedTime = 0
let hasSuccessfullySentMessage = false

const counter = computed(() => {
  const length = formData.message?.length ?? 0
  if (length < MESSAGE_MIN) return `${length}/${MESSAGE_MIN}`
  return `${MESSAGE_MAX - length}/${MESSAGE_MAX}`
})

const showAlert = (title: string, description: string) => alertModal.open({ title, description })

const onSubmit = async (event: FormSubmitEvent<FormSchema>) => {
  if (!captchaResponse.value) {
    showAlert(
      "reCAPTCHA validation failed",
      captchaError.value
        ? `Please email me directly at ${contactEmail}.`
        : `Please complete the reCAPTCHA validation, or email me directly at ${contactEmail}.`,
    )
    return
  }

  const currentTime = Date.now()
  if (currentTime - lastSubmittedTime < SUBMIT_COOLDOWN_MS) {
    if (hasSuccessfullySentMessage) {
      showAlert("Message already sent", "You can send another message in a minute.")
    } else {
      showAlert("Too many submissions", "Please wait before submitting again.")
    }
    return
  }
  lastSubmittedTime = currentTime

  // The captcha response is validated by EmailJS
  const { success } = await emailjs.send({
    name: event.data.name,
    email: event.data.email,
    message: event.data.message,
    "g-recaptcha-response": captchaResponse.value,
  })
  if (success) {
    toast.add({ title: "Message sent", id: "message-sent", color: "success" })
    hasSuccessfullySentMessage = true
  } else {
    toast.add({
      title: "Failed to send message",
      description: `Please email me directly at ${contactEmail}.`,
      id: "message-error",
      color: "error",
      duration: 8000,
    })
  }
}
</script>
