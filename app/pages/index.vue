<script lang="ts" setup>
import { hasSection } from '~/data/sections'

defineOgImage('FriteCustom')
</script>

<template>
  <div class="relative overflow-x-hidden">
    <AppHeader />
    <main>
      <SectionHero />
      <LazySectionWork hydrate-on-visible />
      <LazySectionClients v-if="hasSection('clients')" hydrate-on-visible />
      <LazySectionAbout hydrate-on-visible />
      <LazySectionStack hydrate-on-visible />
      <LazySectionContact hydrate-on-visible />
    </main>
    <LazyAppFooter hydrate-on-visible />
    <SectionNav />
  </div>
</template>
