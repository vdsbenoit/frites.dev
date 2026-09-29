<script lang="ts" setup>
import type { Project } from '~/data/projects'

const props = defineProps<{ project: Project, reverse?: boolean }>()

// DOM order matters: on narrow screens the columns stack in this order
const columns = computed(() =>
  props.reverse ? (['screenshots', 'details'] as const) : (['details', 'screenshots'] as const),
)
</script>

<template>
  <article class="overflow-hidden rounded-[4px] border border-neutral-800 bg-surface">
    <div
      class="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-px bg-neutral-800"
    >
      <template v-for="column in columns" :key="column">
        <div v-if="column === 'details'" class="bg-surface p-[clamp(20px,5vw,32px)]">
          <div class="flex items-center gap-3">
            <span
              class="
                flex size-10 items-center justify-center rounded-[8px] text-[15px] font-bold
                text-white
              "
              :style="{ backgroundColor: project.logo.background }"
            >
              <img
                v-if="project.logo.src"
                :src="project.logo.src"
                :alt="`${project.name} logo`"
                class="size-[26px]"
              >
              <template v-else>{{ project.logo.text }}</template>
            </span>
            <div>
              <h3 class="text-[22px] font-bold tracking-[-0.01em]">
                {{ project.name }}
              </h3>
              <p class="mt-0.5 font-mono text-[11px] tracking-[0.06em] text-neutral-500 uppercase">
                {{ project.meta }}
              </p>
            </div>
          </div>

          <p class="mt-6 text-base leading-[1.65] text-pretty text-neutral-300">
            {{ project.description }}
          </p>

          <ul class="mt-6 flex flex-col gap-2.5">
            <li
              v-for="highlight in project.highlights"
              :key="highlight"
              class="flex gap-2.5 text-[15px] text-neutral-300"
            >
              <span class="text-frite-400">→</span>
              {{ highlight }}
            </li>
          </ul>

          <div class="mt-7 flex flex-wrap gap-1.5">
            <UBadge
              v-for="tag in project.tags"
              :key="tag"
              :label="tag"
              color="neutral"
              variant="outline"
              class="
                rounded-[3px] px-[9px] py-1 font-mono text-[11px] font-normal text-neutral-400
                ring-neutral-800
              "
            />
          </div>

          <ULink
            :to="project.link.url"
            target="_blank"
            raw
            class="
              mt-7 inline-flex items-center gap-2 border-b border-frite-400 pb-0.5 text-[15px]
              font-semibold text-frite-400
            "
          >
            {{ project.link.label }} ↗
          </ULink>
        </div>

        <ScreenshotCarousel
          v-else
          :name="project.name"
          :screenshots="project.screenshots"
          :start-index="project.startIndex"
          :is-framed="project.isFramed"
        />
      </template>
    </div>
  </article>
</template>
