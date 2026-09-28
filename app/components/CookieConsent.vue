<template>
  <div class="fixed bottom-6 z-40 flex w-full justify-center px-1">
    <div
      v-if="isCookieConsentShown"
      class="flex flex-row items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100"
    >
      <UIcon class="size-8 sm:size-5" name="i-iconoir-half-cookie" />
      <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
        <div>
          This website
          <ULink
            class="decoration-primary text-nowrap underline underline-offset-2 hover:text-gray-300"
            to="/cookies"
          >
            uses cookies
          </ULink>
        </div>
        <div class="flex w-full gap-2 sm:w-fit">
          <UButton
            size="xs"
            class="flex-1 justify-center"
            variant="solid"
            @click="processConsent(true)"
          >
            OK
          </UButton>
          <UButton
            class="flex-1 justify-center text-nowrap"
            size="xs"
            color="white"
            variant="solid"
            :ui="{ color: { white: { solid: 'dark:hover:bg-gray-800' } } }"
            @click="processConsent(false)"
          >
            Strictly necessary
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isCookieConsentShown = useCookie("cookie-consent-prompt", { default: () => true })
const isCookieConsentGiven = useCookie("cookie-consent", { default: () => false })

const processConsent = (hasAccepted: boolean) => {
  isCookieConsentGiven.value = hasAccepted
  isCookieConsentShown.value = false
}
</script>

<style scoped></style>
