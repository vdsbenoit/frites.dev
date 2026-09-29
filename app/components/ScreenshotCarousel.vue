<script lang="ts" setup>
import type { Screenshot } from '~/data/projects'

const props = defineProps<{
  name: string
  screenshots: Screenshot[]
  startIndex: number
  isFramed: boolean
}>()

// Screenshots without a device frame get one drawn around them
const FRAMED_CLASS = [
  'rounded-[16px] border border-neutral-700 bg-neutral-100',
  'shadow-[0_26px_50px_-22px_rgba(0,0,0,0.9)]',
]
const UNFRAMED_CLASS = 'drop-shadow-[0_26px_45px_rgba(0,0,0,0.9)]'

const CONTROLS = [
  { label: 'Previous', icon: 'i-heroicons-arrow-left' },
  { label: 'Next', icon: 'i-heroicons-arrow-right' },
]

const carouselRef = useTemplateRef('carousel')
const selectedIndex = ref(props.startIndex)

const pad = (value: number) => String(value).padStart(2, '0')
const scrollTo = (index: number) => carouselRef.value?.emblaApi?.scrollTo(index)
const scrollPrev = () => carouselRef.value?.emblaApi?.scrollPrev()
const scrollNext = () => carouselRef.value?.emblaApi?.scrollNext()
</script>

<template>
  <div
    class="
      flex min-w-0 flex-col justify-center gap-4.5 overflow-hidden bg-surface-2
      py-[clamp(20px,5vw,32px)]
    "
  >
    <UCarousel
      ref="carousel"
      v-slot="{ item, index }"
      :items="screenshots"
      :start-index="startIndex"
      loop
      align="center"
      class-names
      :ui="{
        viewport: 'h-[clamp(300px,62vw,380px)] touch-pan-y',
        container: 'h-full items-center',
        item: 'basis-46.5',
      }"
      @select="selectedIndex = $event"
    >
      <button
        type="button"
        :aria-label="item.alt"
        class="
          block w-full scale-[0.86] cursor-pointer opacity-40 transition-[scale,opacity]
          duration-500 ease-[cubic-bezier(.2,.7,.2,1)]
          in-[.is-snapped]:scale-[1.12] in-[.is-snapped]:opacity-100
        "
        @click="scrollTo(index)"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          class="block h-auto w-full"
          :class="isFramed ? FRAMED_CLASS : UNFRAMED_CLASS"
        >
      </button>
    </UCarousel>

    <div class="flex items-center justify-between gap-4 px-[clamp(20px,5vw,32px)]">
      <span
        class="font-mono text-[11px] tracking-[0.06em] whitespace-nowrap text-neutral-400 uppercase"
      >
        {{ pad(selectedIndex + 1) }} / {{ pad(screenshots.length) }}
      </span>
      <div class="flex items-center gap-1.5">
        <button
          v-for="(screenshot, index) in screenshots"
          :key="screenshot.src"
          type="button"
          :aria-label="`Show screen ${index + 1}`"
          class="
            h-1.5 cursor-pointer rounded-[3px] transition-[width,background-color] duration-300
          "
          :class="index === selectedIndex ? 'w-5.5 bg-frite-400' : 'w-1.5 bg-neutral-700'"
          @click="scrollTo(index)"
        />
      </div>
      <div class="flex gap-1.5">
        <UButton
          v-for="control in CONTROLS"
          :key="control.label"
          :icon="control.icon"
          :aria-label="`${control.label} ${name} screen`"
          color="neutral"
          variant="outline"
          class="
            size-10 justify-center rounded-[4px] bg-neutral-950 text-neutral-100 ring-neutral-700
            hover:bg-neutral-950 hover:text-frite-400 hover:ring-frite-400
          "
          @click="control.label === 'Previous' ? scrollPrev() : scrollNext()"
        />
      </div>
    </div>
  </div>
</template>
