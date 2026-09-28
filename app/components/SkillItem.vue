<template>
  <div ref="thisComponent" class="relative">
    <div>
      <!-- Invisible div that cover the whole parent div, to increase the hover area -->
      <!-- Creating a group with the parent div induced weird hover effects with the translations -->
      <div
        v-intersection-observer="[onIntersectionObserver, { threshold: 0.9 }]"
        class="peer absolute inset-0 z-20 cursor-pointer"
        @click="showDescription"
      ></div>
      <!-- Icon -->
      <div
        id="icon"
        class="flex size-12 scale-100 items-center justify-center rounded-full border border-gray-800 bg-gray-900 ease-in-out peer-hover:z-10 peer-hover:-translate-y-4 peer-hover:scale-110 peer-hover:shadow-sm peer-hover:shadow-gray-700 motion-safe:transition-all sm:size-16"
      >
        <UIcon
          v-if="icon"
          class="size-6 sm:size-8"
          :name="icon"
          :style="{ color: color ? color : '@apply text-neutral-300' }"
        />
        <span v-else class="font-bold text-nowrap text-gray-300">{{ title }}</span>
      </div>
      <!-- Caption -->
      <div
        ref="captionElement"
        class="absolute bottom-0 rounded p-1 text-center text-sm font-semibold text-gray-800 opacity-0 shadow shadow-gray-600 ease-in-out peer-hover:z-10 peer-hover:translate-y-6 peer-hover:opacity-100 motion-safe:transition-all"
        :style="{ backgroundColor: color ? color : '' }"
        :class="[{ 'bg-gray-100': !color }, xClassesCaption]"
      >
        {{ title }}
      </div>
    </div>
    <!-- Description popup -->
    <div
      id="description"
      ref="descriptionElement"
      class="fixed top-1/2 z-30 w-[97%] origin-center -translate-y-1/2 rounded bg-gray-100 p-4 text-base text-gray-900 motion-safe:transition-all sm:absolute sm:w-auto sm:min-w-80"
      :class="[
        {
          'scale-100': isDescriptionDisplayed,
          'scale-0': !isDescriptionDisplayed,
        },
        xClassesDescription,
      ]"
    >
      <div class="flex items-center justify-between">
        <h4
          class="text rounded px-2 py-1 font-bold text-wrap"
          :style="{ backgroundColor: color ? color : '' }"
          :class="{
            'text-gray-800': color,
            'bg-gray-800 text-gray-300': !color,
          }"
        >
          {{ title }}
        </h4>
        <div
          class="size-7 cursor-pointer rounded hover:bg-gray-300 active:bg-gray-500"
          @click="hideDescription"
        >
          <UIcon class="size-7" name="i-heroicons-x-mark-16-solid" />
        </div>
      </div>

      <p class="pt-3">{{ description }}</p>
      <p v-if="opinion" class="mt-2 border-t border-gray-400 pt-2">{{ opinion }}</p>
      <UMeter
        v-if="level"
        class="pt-3"
        :color="levelColor"
        :value="preferredMotion === 'reduce' ? level : displayedLevel"
        :min="0"
        :max="3"
        :ui="{
          meter: {
            bar: {
              transition:
                '[&::-webkit-meter-optimum-value]:duration-700 [&::-moz-meter-bar]:duration-700 [&::-webkit-meter-optimum-value]:ease-in-out [&::-moz-meter-bar]:ease-in-out',
            },
          },
        }"
      >
        <template #label>
          <p class="text-sm tracking-wide">Proficiency : {{ levelText }}</p>
        </template>
      </UMeter>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from "vue"
import { useElementBounding, useEventListener, usePreferredReducedMotion } from "@vueuse/core"
import { vIntersectionObserver } from "@vueuse/components"
import type { SkillItem } from "~/types/skills.interfaces.ts"

const props = defineProps<SkillItem>()

const preferredMotion = usePreferredReducedMotion()
const thisComponent = ref<HTMLElement | null>(null)
const descriptionElement = ref<HTMLElement | null>(null)
const descriptionRect = useElementBounding(descriptionElement)
const isDescriptionDisplayed = ref(false)
const xClassesDescription = ref<string[]>(["left-1/2", "-translate-x-1/2"])
const captionElement = ref<HTMLElement | null>(null)
const captionRect = useElementBounding(captionElement)
const xClassesCaption = ref<string[]>(["left-1/2", "-translate-x-1/2", "text-nowrap"])
const displayedLevel = ref(0)

const levelText = computed(() => {
  switch (props.level) {
    case 1:
      return "Elementary"
    case 2:
      return "Good"
    case 3:
      return "Advanced"
    default:
      return "Unknown"
  }
})

const levelColor = computed(() => {
  switch (props.level) {
    case 1:
      return "orange"
    case 2:
      return "primary"
    case 3:
      return "green"
    default:
      return "gray"
  }
})

/**
 * Ensure the caption does not go out the the viewport
 */
const adjustCaptionPosition = () => {
  if (!captionRect.width.value) return
  if (window.innerWidth < 640 && captionRect.width.value >= 640 * 0.97) {
    xClassesCaption.value = ["left-1/2", "-translate-x-1/2", "text-wrap"]
    return
  }
  if (captionRect.left.value < 0) {
    xClassesCaption.value = ["left-0", "text-nowrap"]
    return
  }
  // if caption goes out of the viewport on the right side
  if (captionRect.right.value > window.innerWidth) {
    xClassesCaption.value = ["right-0", "text-nowrap"]
    return
  }
}

/**
 * Ensure the description popup does not go out the the viewport
 */
watch(descriptionRect.left, () => {
  if (window.innerWidth < 640) return
  if (descriptionRect.left.value < 0) {
    xClassesDescription.value = ["left-0"]
    return
  }
  // if description goes out of the viewport on the right side
  if (descriptionRect.right.value > window.innerWidth) {
    xClassesDescription.value = ["left-1/2", "-translate-x-3/4"]
    return
  }
})

const showDescription = async () => {
  xClassesDescription.value = ["left-1/2", "-translate-x-1/2"]
  isDescriptionDisplayed.value = true
  displayedLevel.value = props.level ?? 0
}

const hideDescription = () => {
  isDescriptionDisplayed.value = false
  displayedLevel.value = 0
}

const clickOutsideDescription = (event: MouseEvent) => {
  if (!isDescriptionDisplayed.value) return
  if (thisComponent.value && thisComponent.value.contains(event.target as Node)) return
  hideDescription()
}
const onIntersectionObserver = ([entry]: IntersectionObserverEntry[]) => {
  if (entry && isDescriptionDisplayed.value && !entry.isIntersecting) hideDescription()
}

onMounted(() => {
  useEventListener(window, "click", clickOutsideDescription)
  useEventListener(descriptionElement, "transitionend", descriptionRect.update)
  useEventListener(window, "resize", adjustCaptionPosition)
  adjustCaptionPosition()
})
</script>

<style lang="postcss" scoped>
::selection {
  @apply text-gray-100;
  background-color: v-bind(color);
}
</style>
