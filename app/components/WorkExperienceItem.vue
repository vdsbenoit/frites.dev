<template>
  <div
    ref="thisComponent"
    v-intersection-observer="[onIntersectionObserver, { threshold: 0.1 }]"
    class="flex items-center"
  >
    <!-- Left side badge -->
    <div
      class="mr-6 shrink-0 overflow-hidden text-center motion-safe:transition-all motion-safe:duration-700 sm:mr-8 sm:block sm:w-16"
      :class="{
        'hidden w-0': isDescriptionDisplayed,
        'w-16': !isDescriptionDisplayed,
      }"
      @mouseenter="isBadgeHovered = true"
      @mouseleave="isBadgeHovered = false"
    >
      <UBadge :class="{ 'flip-badge': isBadgeRotating }" color="primary" variant="outline">
        {{ badgeText }}
      </UBadge>
    </div>
    <!-- Right side content -->
    <!-- I use flex-col-reverse so the description pushes the surrounding content upwards when being opened -->
    <div
      class="border-primary relative flex origin-left flex-col-reverse motion-safe:transition-all motion-safe:hover:scale-110 sm:border-l sm:pl-10"
      :class="{
        'z-0 scale-110 cursor-default py-8': isDescriptionDisplayed,
        'z-10 cursor-pointer border-l py-4 pl-8': !isDescriptionDisplayed,
      }"
      @click="isDescriptionDisplayed = true"
    >
      <!-- Title -->
      <div
        class="decoration-primary order-3 line-clamp-1 underline-offset-4 motion-safe:transition-all motion-safe:duration-700"
        :class="{
          'mb-2 font-semibold underline': isDescriptionDisplayed,
        }"
      >
        {{ title }}
      </div>

      <!-- Description  -->
      <div
        class="relative order-2 w-11/12 overflow-hidden border-l-2 border-gray-600 bg-gray-900 px-3 text-justify text-sm motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-in-out sm:w-10/12 sm:px-4"
        :class="{
          'max-h-[1000px]': isDescriptionDisplayed,
          'max-h-0': !isDescriptionDisplayed,
        }"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="mb-4 py-2" v-html="description"></p>
        <!-- Close button -->
        <div
          class="absolute right-0 bottom-0 left-0 flex h-4 cursor-pointer items-center justify-center bg-gray-800 hover:bg-gray-700 active:shadow-inner active:shadow-gray-900"
          @click.stop="isDescriptionDisplayed = false"
        >
          <UIcon
            name="i-heroicons-chevron-down-solid"
            class="size-5 text-gray-100 motion-safe:transition"
            :class="{ 'rotate-180': isDescriptionDisplayed }"
          />
        </div>
      </div>
      <!-- Location -->
      <div class="order-1 text-sm text-gray-400" :class="{ 'mt-2': isDescriptionDisplayed }">
        <span class="font-bold uppercase">{{ company }}</span>
        <span> • </span>
        <span>{{ location }}</span>
      </div>
      <!-- Icon (absolute position, relative to content) -->
      <div
        class="absolute top-1/2 -left-5 flex size-10 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full sm:scale-100"
        :class="[
          { 'bg-primary': !icon },
          iconWrapperClass,
          isDescriptionDisplayed ? 'scale-0' : 'scale-100',
        ]"
      >
        <UIcon
          v-if="!icon"
          name="i-heroicons-check-circle"
          :aria-label="`${company} icon`"
          :class="[iconClass ? iconClass : 'size-6 text-gray-800']"
        />
        <img
          v-else-if="icon.startsWith('~')"
          :src="imgPath"
          :alt="`${company} icon`"
          :class="[iconClass ? iconClass : 'size-8']"
        />
        <UIcon v-else :name="icon" :class="[iconClass ? iconClass : 'size-8']" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computedAsync, useEventListener, usePreferredReducedMotion } from "@vueuse/core"
import { vIntersectionObserver } from "@vueuse/components"

const props = defineProps<{
  title: string
  company: string
  location: string
  icon?: string
  iconClass?: string
  iconWrapperClass?: string
  from: number
  to?: number
  description: string
}>()

const preferredMotion = usePreferredReducedMotion()
const thisComponent = ref<HTMLElement | null>(null)
const isBadgeHovered = ref(false)
const isBadgeRotating = ref(false)
const badgeText = ref(props.from.toString())
const isDescriptionDisplayed = ref(false)

// Compute the duration of the work experience
const experienceDuration = computed(() => {
  if (!props.to) return "Current"
  const duration = props.to - props.from
  return `${duration} year${duration > 1 ? "s" : ""}`
})

// Load the icon if it's a local asset
type AssetModule = {
  default: string
}
const imgPath = computedAsync(async () => {
  if (props.icon && props.icon.startsWith("~")) {
    const assets = import.meta.glob<AssetModule>("~/assets/img/**/*")
    const loadAsset = assets[props.icon.slice(1)]
    if (!loadAsset) throw new Error(`${props.icon} not found in ~/assets/`)
    return (await loadAsset()).default
  } else return ""
}, "")

// Animate the badge text when hovering
watch(isBadgeHovered, async (newHoverState) => {
  isBadgeRotating.value = true
  setTimeout(
    () => {
      badgeText.value = newHoverState ? experienceDuration.value : props.from.toString()
    },
    preferredMotion.value === "reduce" ? 0 : 250,
  )
  setTimeout(() => {
    isBadgeRotating.value = false
  }, 500)
})

const clickOutsideDescription = (event: MouseEvent) => {
  if (!isDescriptionDisplayed.value) return
  if (thisComponent.value?.contains(event.target as Node)) return
  isDescriptionDisplayed.value = false
}
const onIntersectionObserver = ([entry]: IntersectionObserverEntry[]) => {
  if (entry && isDescriptionDisplayed.value && !entry.isIntersecting)
    isDescriptionDisplayed.value = false
}

onMounted(() => {
  useEventListener(window, "click", clickOutsideDescription)
})
</script>
<style scoped>
@keyframes flip {
  from {
    transform: rotateX(-360deg);
  }
  to {
    transform: rotateX(0deg);
  }
}
.flip-badge {
  animation: flip 500ms forwards;
}
@media (prefers-reduced-motion) {
  .flip-badge {
    animation: none;
  }
}
</style>
