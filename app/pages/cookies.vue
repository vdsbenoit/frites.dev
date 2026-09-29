<script lang="ts" setup>
const { isPromptShown, isConsentGiven } = useCookieConsent()

watch(isConsentGiven, () => {
  isPromptShown.value = false
})
</script>

<template>
  <UContainer class="max-w-[820px] py-[clamp(56px,10vw,96px)]">
    <SectionHeader as="h1" title="Cookies & privacy" />
    <div class="mt-8 flex flex-col gap-4 text-base leading-[1.65] text-neutral-300">
      <p>
        Your privacy is extremely important to us. We are committed to handling your personal data
        in a legal, fair, and transparent way. This privacy statement complies with the General Data
        Protection Regulation (GDPR), effective since May 25, 2018. This website uses cookies to
        enhance the browsing experience for our visitors. Cookies help our site perform better and
        adapt to your preferences. This website stores necessary preference cookies and may also use
        Google services such as reCAPTCHA. These external services may set additional cookies (for
        example, reCAPTCHA cookies such as <code class="font-mono text-sm">_grecaptcha</code>) to
        support security and service functionality.
      </p>
      <p>
        As announced by Google for reCAPTCHA (effective April 2, 2026), when reCAPTCHA is enabled on
        this site, we act as the data controller and Google acts as a data processor for data
        processed by reCAPTCHA under Google Cloud terms, including the Cloud Data Processing
        Addendum. reCAPTCHA processing is no longer governed by Google's consumer Privacy Policy and
        Terms of Service for this specific service context.
      </p>

      <h2 class="mt-6 text-lg font-semibold text-neutral-100">
        Cookie settings
      </h2>
      <p>
        User settings cookies are necessary and are always enabled. Optional cookies (incl.
        Google's) are disabled by default. You can change this setting using the switch below.
        Please note that disabling optional cookies will prevent some features from functioning
        properly.
      </p>
      <USwitch v-model="isConsentGiven" name="cookieToggle">
        <template #label>
          Optional cookies are
          <span v-if="isConsentGiven" class="text-green-500">enabled</span>
          <span v-else class="text-red-500">disabled</span>
        </template>
      </USwitch>

      <h2 class="mt-6 text-lg font-semibold text-neutral-100">
        Removing cookies
      </h2>
      <p>
        Most web browsers allow you to delete cookies from your device. You can also block cookies
        in advance or request a warning before cookies are installed. For more information, refer to
        your browser's instructions or help section.
      </p>
    </div>
    <UButton
      class="mt-10"
      icon="i-heroicons-arrow-left"
      color="neutral"
      variant="outline"
      to="/"
      label="Back to home page"
    />
  </UContainer>
</template>
