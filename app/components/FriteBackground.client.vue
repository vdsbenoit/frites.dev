<!-- Flying fries filling their positioned parent. Each layer is rendered twice, one parent-height apart, so the upward loop is seamless. -->
<template>
  <div
    ref="root"
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 transition-opacity duration-1000"
    :class="isVisible ? 'opacity-100' : 'opacity-0'"
    :style="{ '--fries-height': `${height}px` }"
  >
    <div
      v-for="(layer, layerIndex) in layers"
      :key="layerIndex"
      class="absolute inset-0 overflow-hidden"
    >
      <div
        v-for="offset in [0, height]"
        :key="offset"
        class="absolute inset-0"
        :style="{ animation: `fries-fall ${layer.duration}s linear infinite` }"
      >
        <img
          v-for="(fry, fryIndex) in layer.fries"
          :key="fryIndex"
          :src="friteUrl"
          alt=""
          class="absolute w-auto opacity-85"
          :style="{
            top: `${fry.top + offset}px`,
            left: `${fry.left}px`,
            height: `${layer.size}rem`,
            animation: `fries-spin-${fry.direction} ${fry.spinDuration}s linear infinite`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn, useEventListener, whenever } from "@vueuse/core"
import friteUrl from "~/assets/img/frite-background.png"

interface Fry {
  top: number
  left: number
  direction: "cw" | "ccw"
  spinDuration: number
}

interface FriesLayer {
  fries: Fry[]
  duration: number // seconds to travel one parent height
  size: number // rem
}

// Only regenerate on significant resizes (not when a mobile address bar collapses)
const RESET_THRESHOLD_X = 0.1
const RESET_THRESHOLD_Y = 0.2

const appConfig = useAppConfig()
const rootElement = useTemplateRef("root")
const width = ref(0)
const height = ref(0)
const layers = ref<FriesLayer[]>([])
const isVisible = ref(false)

const generateFries = (count: number): Fry[] =>
  Array.from({ length: Math.round(count) }, () => ({
    top: Math.floor(Math.random() * height.value),
    left: Math.floor(Math.random() * width.value),
    direction: Math.random() > 0.5 ? "cw" : "ccw",
    spinDuration: Math.random() * 100 + 10,
  }))

const setFries = () => {
  if (!rootElement.value) return
  width.value = rootElement.value.clientWidth
  height.value = rootElement.value.clientHeight
  const count = ((width.value * height.value) / 40000) * appConfig.friesDensity
  layers.value = [
    { fries: generateFries(count * 5), duration: 70, size: 0.5 },
    { fries: generateFries(count * 2), duration: 100, size: 0.8 },
    { fries: generateFries(count), duration: 150, size: 1.5 },
  ]
}

const resetFries = () => {
  if (!rootElement.value) return
  if (
    Math.abs(rootElement.value.clientWidth - width.value) > width.value * RESET_THRESHOLD_X ||
    Math.abs(rootElement.value.clientHeight - height.value) > height.value * RESET_THRESHOLD_Y
  )
    setFries()
}

// Client-only components render their template after mounting a placeholder: wait for the element
whenever(
  rootElement,
  () => {
    setFries()
    requestAnimationFrame(() => {
      isVisible.value = true
    })
  },
  { once: true },
)

useEventListener(window, "resize", useDebounceFn(resetFries, 200))
</script>

<style>
@keyframes fries-fall {
  to {
    transform: translateY(calc(-1 * var(--fries-height)));
  }
}
@keyframes fries-spin-cw {
  to {
    transform: rotate(360deg);
  }
}
@keyframes fries-spin-ccw {
  to {
    transform: rotate(-360deg);
  }
}
</style>
