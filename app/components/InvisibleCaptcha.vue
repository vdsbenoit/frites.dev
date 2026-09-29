<!--
This component adds an invisible reCaptcha validation to a form.
Instructions of use :
 - Set the reCaptcha site key in the public.captchaSiteKey property of the nuxt.config.ts file.
 - Wrap the form with this component. It will automatically execute the reCaptcha validation when the form is focused out.
 - In the parent component, read the v-model:response and v-model:error values to check the validation status.

Since the reCaptcha badge is hidden, this component shows a notice that the site is protected by reCaptcha.
Customize it with the notice slot and the notice-class prop.
-->
<template>
  <div>
    <div @focusout="execute">
      <slot />
    </div>
    <div
      class="g-recaptcha"
      :data-sitekey="nuxtRuntimeConfig.public.captchaSiteKey"
      data-callback="captchaCallback"
      data-size="invisible"
      data-expired-callback="captchaExpiredCallback"
      data-error-callback="captchaErrorCallback"
    ></div>

    <!-- Depends on the consent cookie, which is unknown when the page is prerendered -->
    <ClientOnly>
      <p v-if="isConsentGiven" :class="noticeClass">
        <slot name="notice">This site is protected by reCAPTCHA.</slot>
      </p>
      <p v-else :class="noticeClass" class="text-red-400">
        This form is protected against robots. Please,
        <button type="button" class="cursor-pointer underline" @click="isPromptShown = true">
          accept the use of cookies
        </button>
        to enable the reCAPTCHA validation.
      </p>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const nuxtRuntimeConfig = useRuntimeConfig()

const response = defineModel<string>("response")
const error = defineModel<boolean>("error")

withDefaults(defineProps<{ noticeClass?: string }>(), {
  noticeClass: "text-xs",
})

const { isPromptShown, isConsentGiven } = useCookieConsent()

const execute = () => {
  if (!isConsentGiven.value) return
  error.value = false
  if (response.value != "") return
  if (!window.grecaptcha) {
    console.error("reCAPTCHA not loaded")
    error.value = true
    return
  }
  try {
    window.grecaptcha.execute()
    console.log("reCAPTCHA executed")
  } catch (e) {
    console.error("reCAPTCHA error", e)
    error.value = true
  }
}

onMounted(() => {
  window.captchaCallback = (resp: string) => {
    console.log("reCAPTCHA response", resp)
    response.value = resp
  }
  window.captchaExpiredCallback = () => {
    console.log("reCAPTCHA expired. Executing again.")
    response.value = ""
    execute()
  }
  window.captchaErrorCallback = () => {
    console.error("reCAPTCHA error")
    response.value = ""
    error.value = true
  }
  // If the script is already loaded, do nothing
  if (!window.grecaptcha) {
    useScript(
      {
        src: "https://www.google.com/recaptcha/api.js",
        defer: true,
        async: true,
        referrerpolicy: false,
        crossorigin: false,
      },
      {
        trigger: useScriptTriggerConsent({
          consent: isConsentGiven,
        }),
      },
    )
  }
})
</script>

<style>
.grecaptcha-badge {
  visibility: hidden;
}
</style>
