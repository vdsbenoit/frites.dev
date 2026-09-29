<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import { sections } from '~/data/sections'

const isMenuOpen = ref(false)

const navSections = sections.filter(section => section.id !== 'contact')

const menuItems: DropdownMenuItem[] = sections.map(section => ({
  label: section.label,
  to: `/#${section.id}`,
  active: false,
  number: section.number,
}))
</script>

<template>
  <UHeader
    :toggle="false"
    :ui="{
      root: `
        pointer-events-none fixed inset-x-0 top-5 h-auto border-0 bg-transparent px-4
        backdrop-blur-none
      `,
      container: [
        `
          pointer-events-auto max-w-280 gap-4 px-0 py-2
          sm:px-0
          lg:px-0
        `,
        `
          rounded-[16px] border border-neutral-100/12 bg-[rgba(20,20,20,0.55)] backdrop-blur-[20px]
          backdrop-saturate-180
        `,
        `
          shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.4),0_10px_30px_-12px_rgba(0,0,0,0.8)]
        `,
      ],
      left: `
        flex-1 pl-3.5
        lg:flex-1
      `,
      center: `
        hidden pr-2.5
        min-[720px]:flex
      `,
      right: `
        pr-2.5
        min-[720px]:hidden
        lg:flex-none
      `,
    }"
  >
    <template #left>
      <ULink
        to="/#top" raw class="
          flex shrink-0 items-center gap-2
          hover:text-inherit
        "
      >
        <img src="~/assets/img/logo-transparent.png" alt="frites.dev logo" class="size-7.5">
        <span class="text-[17px] font-bold tracking-[-0.01em]">frites.dev</span>
      </ULink>
    </template>

    <nav class="flex items-center gap-1">
      <UButton
        v-for="section in navSections"
        :key="section.id"
        :to="`/#${section.id}`"
        :label="section.label"
        color="neutral"
        variant="ghost"
        class="
          rounded-[9px] px-2.75 py-1.5 text-sm font-medium text-neutral-300
          hover:bg-neutral-100/8 hover:text-neutral-100
        "
      />
      <UButton
        to="/#contact"
        label="Start a project"
        class="ml-1 rounded-[10px] px-3.5 py-1.75 text-sm font-semibold whitespace-nowrap"
      />
    </nav>

    <template #right>
      <UButton
        to="/#contact"
        label="Contact"
        class="rounded-[10px] px-3.5 py-2.25 text-sm font-semibold whitespace-nowrap"
      />
      <UDropdownMenu
        v-model:open="isMenuOpen"
        :items="menuItems"
        :content="{ align: 'end', sideOffset: 16, alignOffset: -10 }"
        :ui="{
          content: [
            'w-[calc(100vw-32px)] rounded-[16px] p-2 ring-0',
            `
              border border-neutral-100/12 bg-[rgba(20,20,20,0.72)] backdrop-blur-[20px]
              backdrop-saturate-180
            `,
            'shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_40px_-12px_rgba(0,0,0,0.85)]',
          ],
          group: 'p-0',
          item: `
            items-center rounded-[10px] p-3.5 text-base font-medium text-neutral-100
            before:inset-0 before:rounded-[10px]
            data-highlighted:before:bg-neutral-100/8
          `,
        }"
      >
        <UButton
          :icon="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
          aria-label="Menu"
          color="neutral"
          variant="outline"
          class="size-11 justify-center rounded-[10px] bg-neutral-100/6 ring-neutral-100/14"
          :ui="{ leadingIcon: 'size-5' }"
        />
        <template #item-trailing="{ item }">
          <span class="font-mono text-[11px] text-frite-400">{{ item.number }}</span>
        </template>
      </UDropdownMenu>
    </template>
  </UHeader>
</template>
