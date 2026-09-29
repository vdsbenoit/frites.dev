<script lang="ts" setup>
const nuxtConfig = useRuntimeConfig()
onMounted(() => {
  console.info(`App Version: ${nuxtConfig.public.appVersion}`)
  // Prevent gesture zoom on mobile
  document.addEventListener('gesturestart', e => e.preventDefault())
})
</script>

<template>
  <UApp :toaster="{ position: 'bottom-center' }">
    <NuxtPage />
    <CookieConsent />
  </UApp>
</template>
