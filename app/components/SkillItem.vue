<script lang="ts" setup>
import type { Skill } from '~/data/stack'

defineProps<{ skill: Skill }>()

const LEVELS = {
  1: { label: 'Elementary', color: '#f97316' },
  2: { label: 'Good', color: '#f4c61f' },
  3: { label: 'Advanced', color: '#22c55e' },
} as const

const isOpen = ref(false)
// Animated from 0 once the modal is open
const displayedLevel = ref(0)
</script>

<template>
  <div class="group/skill relative">
    <UModal
      v-model:open="isOpen"
      :title="skill.title"
      :description="skill.description"
      :ui="{
        overlay: 'bg-black/60',
        content:
          `
            w-[min(360px,calc(100vw-32px))] divide-y-0 rounded-[4px] bg-neutral-100 p-4 text-base
            text-neutral-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-0
          `,
        header: `
          min-h-0 flex-col items-stretch gap-0 p-0
          sm:px-0
        `,
        title: 'flex',
        description: 'mt-3 text-base/normal text-neutral-900',
        body: `
          p-0
          sm:p-0
        `,
        close:
          `
            inset-e-4 top-4 size-7 justify-center rounded-[4px] p-0 text-neutral-900
            hover:bg-neutral-300
          `,
      }"
      @after:enter="displayedLevel = skill.level"
      @after:leave="displayedLevel = 0"
    >
      <UButton
        :aria-label="skill.title"
        color="neutral"
        variant="outline"
        class="
          size-16 justify-center rounded-full bg-neutral-900 ring-neutral-800 transition-all
          duration-200 ease-in-out
          hover:-translate-y-4 hover:scale-110 hover:bg-neutral-900
          hover:shadow-[0_1px_3px_0_#404040]
        "
      >
        <UIcon :name="skill.icon" class="size-8" :style="{ color: skill.color }" />
      </UButton>

      <template #title>
        <span
          class="rounded-[4px] px-2 py-1 font-bold text-neutral-800"
          :style="{ backgroundColor: skill.color }"
        >
          {{ skill.title }}
        </span>
      </template>

      <template #body>
        <p class="mt-2 border-t border-neutral-400 pt-2 leading-normal">
          {{ skill.opinion }}
        </p>
        <div class="pt-3">
          <p class="mb-1 text-sm tracking-wide">
            Proficiency : {{ LEVELS[skill.level].label }}
          </p>
          <UProgress
            :model-value="displayedLevel"
            :max="3"
            :color="LEVELS[skill.level].color"
            :ui="{ base: 'bg-neutral-300', indicator: 'duration-700 ease-in-out' }"
          />
        </div>
      </template>
    </UModal>

    <span
      class="
        pointer-events-none absolute -bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-[4px] p-1
        text-center text-sm font-semibold whitespace-nowrap text-neutral-800 opacity-0
        shadow-[0_1px_3px_0_#525252] transition-opacity
        group-hover/skill:opacity-100
      "
      :style="{ backgroundColor: skill.color }"
    >
      {{ skill.title }}
    </span>
  </div>
</template>
