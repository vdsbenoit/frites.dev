<script lang="ts" setup>
import type { TimelineItem } from '@nuxt/ui'
import { experienceRange, experiences } from '~/data/experiences'

const INDICATOR_CLASS = [
  'size-12 bg-transparent p-0 shadow-[0_0_0_3px_#0a0a0a] transition-shadow duration-250',
  'group-data-[state=completed]:bg-transparent group-data-[state=active]:bg-transparent',
  'group-data-[state=active]:shadow-[0_0_0_3px_#0a0a0a,0_0_0_5px_#f4c61f]',
].join(' ')
const SEPARATOR_CLASS = `
  rounded-none bg-frite-400
  group-data-[state=completed]:bg-frite-400
`
const BADGE_CLASS = [
  'rounded-[4px] px-2 py-0.5 text-xs leading-4 font-medium whitespace-nowrap text-frite-400 ring-frite-400',
  'transition-colors duration-200 group-data-[state=active]:bg-frite-400 group-data-[state=active]:text-neutral-800',
].join(' ')

const items = experiences.map((experience, index) => ({
  value: index,
  date: String(experience.from),
  title: experience.title,
  experience,
})) satisfies TimelineItem[]

const selectedIndex = ref<number>()
const selectedExperience = computed(() =>
  selectedIndex.value === undefined ? undefined : experiences[selectedIndex.value],
)

function toggle(index: TimelineItem['value']) {
  selectedIndex.value = selectedIndex.value === index ? undefined : Number(index)
}

function titleClass(index: number) {
  if (selectedIndex.value === index) return 'font-semibold text-neutral-100'
  return selectedIndex.value === undefined ? 'text-neutral-100' : 'text-neutral-400'
}
</script>

<template>
  <div>
    <!-- Desktop: horizontal timeline, detail panel below -->
    <div
      class="
        mt-5 hidden scrollbar-thin [scrollbar-color:#404040_transparent] overflow-x-auto pb-1.5
        min-[720px]:block
      "
    >
      <UTimeline
        :items="items"
        :model-value="selectedIndex"
        orientation="horizontal"
        :ui="{
          root: `
            relative min-w-4xl gap-0 ps-14
            before:absolute before:inset-s-0 before:top-14 before:h-px before:w-14
            before:bg-linear-to-r before:from-transparent before:to-frite-400
          `,
          item: 'min-w-35 cursor-pointer gap-3.5',
          container: 'h-11 gap-0',
          indicator: INDICATOR_CLASS,
          separator: SEPARATOR_CLASS,
          wrapper: 'contents',
          date: '-order-1 flex w-12 justify-center',
          title: 'pe-4 text-[15px] leading-[1.35] font-normal',
        }"
        @select="(_, item) => toggle(item.value)"
      >
        <template #date="{ item }">
          <UBadge :label="item.date" variant="outline" :class="BADGE_CLASS" />
        </template>
        <template #indicator="{ item }">
          <ExperienceLogo :experience="item.experience" />
        </template>
        <template #title="{ item }">
          <button
            type="button"
            class="cursor-pointer text-start transition-colors duration-200"
            :class="titleClass(item.value)"
            :aria-expanded="selectedIndex === item.value"
          >
            {{ item.title }}
          </button>
        </template>
      </UTimeline>
    </div>

    <div
      v-if="selectedExperience"
      class="
        mt-7 hidden rounded-[4px] border border-l-2 border-neutral-800 border-l-frite-400 bg-surface
        px-7 py-6
        min-[720px]:block
      "
    >
      <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <div class="text-lg leading-[1.3] font-semibold text-neutral-100">
            {{ selectedExperience.title }}
          </div>
          <div class="mt-1 text-sm text-neutral-400">
            <span class="font-bold uppercase">{{ selectedExperience.company }}</span>
            • {{ selectedExperience.location }}
          </div>
        </div>
        <span class="flex items-center gap-3.5">
          <span class="font-mono text-xs whitespace-nowrap text-frite-400">
            {{ experienceRange(selectedExperience) }}
          </span>
          <UButton
            icon="i-heroicons-x-mark"
            aria-label="Close"
            color="neutral"
            variant="outline"
            class="
              size-8 justify-center rounded-[4px] text-neutral-400 ring-neutral-800
              hover:bg-neutral-800 hover:text-neutral-100
            "
            @click="selectedIndex = undefined"
          />
        </span>
      </div>
      <!-- eslint-disable vue/no-v-html -- trusted static content -->
      <p
        class="mt-4 max-w-195 text-[15px] leading-[1.65] text-pretty text-neutral-300"
        v-html="selectedExperience.description"
      />
      <!-- eslint-enable vue/no-v-html -->
    </div>

    <!-- Mobile: vertical timeline, descriptions expand inline -->
    <UTimeline
      :items="items"
      :model-value="selectedIndex"
      orientation="vertical"
      class="
        mt-6
        min-[720px]:hidden
      "
      :ui="{
        root: 'gap-0',
        item: 'cursor-pointer gap-4',
        container: 'gap-0',
        indicator: INDICATOR_CLASS,
        separator: `
          my-1.5 w-px
          ${SEPARATOR_CLASS}
        `,
        wrapper: 'pb-8',
        date: 'mb-2',
        title: 'text-base font-normal',
        description: 'text-sm text-neutral-400',
      }"
      @select="(_, item) => toggle(item.value)"
    >
      <template #date="{ item }">
        <UBadge :label="item.date" variant="outline" :class="BADGE_CLASS" />
      </template>
      <template #indicator="{ item }">
        <ExperienceLogo :experience="item.experience" />
      </template>
      <template #title="{ item }">
        <button
          type="button"
          class="cursor-pointer text-start"
          :class="{ 'font-semibold': selectedIndex === item.value }"
          :aria-expanded="selectedIndex === item.value"
        >
          {{ item.title }}
        </button>
      </template>
      <template #description="{ item }">
        <p class="mt-1">
          <span class="font-bold uppercase">{{ item.experience.company }}</span>
          • {{ item.experience.location }}
        </p>
        <UCollapsible :open="selectedIndex === item.value">
          <template #content>
            <!-- eslint-disable vue/no-v-html -- trusted static content -->
            <p
              class="
                mt-3 border-l-2 border-neutral-600 bg-neutral-900 px-4 py-3 leading-[1.6]
                text-neutral-300
              "
              v-html="item.experience.description"
            />
            <!-- eslint-enable vue/no-v-html -->
          </template>
        </UCollapsible>
      </template>
    </UTimeline>
  </div>
</template>
