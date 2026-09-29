<script lang="ts" setup>
const { isPromptShown, isConsentGiven } = useCookieConsent()

function processConsent(hasAccepted: boolean) {
  isConsentGiven.value = hasAccepted
  isPromptShown.value = false
}
</script>

<template>
  <div v-if="isPromptShown" class="fixed inset-x-0 bottom-5 z-60 flex justify-center px-4">
    <div
      class="
        flex flex-wrap items-center gap-3.5 rounded-[14px] border border-neutral-100/12
        bg-[rgba(20,20,20,0.6)] px-3.5 py-2.5 text-sm text-neutral-100
        shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_30px_-12px_rgba(0,0,0,0.8)]
        backdrop-blur-[20px] backdrop-saturate-180
      "
    >
      <span>
        This website
        <ULink
          to="/cookies"
          raw
          class="whitespace-nowrap underline decoration-frite-400 underline-offset-[3px]"
        >
          uses cookies
        </ULink>
      </span>
      <span class="flex gap-2">
        <UButton
          label="OK"
          class="rounded-[8px] px-3.5 py-1.5 text-[13px] font-semibold"
          @click="processConsent(true)"
        />
        <UButton
          label="Strictly necessary"
          color="neutral"
          variant="outline"
          class="
            rounded-[8px] bg-neutral-100/6 px-3.5 py-1.5 text-[13px] whitespace-nowrap
            text-neutral-100 ring-neutral-100/18
          "
          @click="processConsent(false)"
        />
      </span>
    </div>
  </div>
</template>
