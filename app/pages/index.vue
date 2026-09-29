<template>
  <div class="relative overflow-x-hidden">
    <AppHeader />
    <main>
      <SectionHero />
      <SectionWork />
      <SectionClients v-if="hasSection('clients')" />
      <SectionAbout />
      <SectionStack />
      <SectionContact />
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import { hasSection } from "~/data/sections"

defineOgImage("FriteCustom")
</script>
