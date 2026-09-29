<script lang="ts" setup>
import { sections } from '~/data/sections'

const year = new Date().getFullYear()
</script>

<template>
  <UFooter
    :ui="{
      root: 'border-t border-neutral-800 bg-surface',
      container: `
        flex flex-wrap items-start justify-between gap-8 pt-12 pb-0
        lg:py-0 lg:pt-12
      `,
      left: `
        order-1 mt-0 min-w-0 flex-initial justify-start
        lg:flex-initial
      `,
      center: 'order-2 mt-0',
      right: `
        order-3 flex-none
        lg:flex-none
      `,
      bottom: `
        pt-8 pb-12
        lg:pt-8 lg:pb-12
      `,
    }"
  >
    <template #left>
      <div class="flex items-start gap-3">
        <img src="~/assets/img/logo-transparent.png" alt="frites.dev logo" class="h-10 w-auto">
        <p class="text-sm leading-[1.6] text-neutral-500">
          © {{ year }} frites.dev SRL — VAT BE1032 412 966
          <br>
          Benoit Vander Stappen —
          <ULink to="mailto:benoit@frites.dev" raw class="text-neutral-400">
            benoit@frites.dev
          </ULink>
        </p>
      </div>
    </template>

    <nav class="flex flex-wrap gap-5">
      <ULink
        v-for="section in sections"
        :key="section.id"
        :to="`/#${section.id}`"
        raw
        class="text-sm text-neutral-500"
      >
        {{ section.label }}
      </ULink>
    </nav>

    <template #right>
      <SocialLinks class="text-neutral-500" icon-class="size-[18px]" />
    </template>

    <template #bottom>
      <UContainer>
        <p class="font-mono text-[11px] tracking-[0.06em] text-neutral-600">
          Made with ♥ from 🇧🇪
        </p>
      </UContainer>
    </template>
  </UFooter>
</template>
