<!-- This layout contains the animated stars background and the ellipse gradient background -->
<template>
  <div>
    <!-- The following gradient color hex are equivalent to Tailwind's neutral-800 & neutral-950 -->
    <div
      id="background-ellipse"
      class="fixed inset-0 -z-50 h-lvh w-lvw bg-cover"
      style="background: radial-gradient(ellipse at bottom, #262626 0%, #0a0a0a 100%)"
    ></div>
    <div
      v-for="(layer, indexLayer) in starLayers"
      :id="`background-stars-layer-${indexLayer}`"
      :key="indexLayer"
      :class="{ 'blur-md': isBackgroundBlurred }"
      class="fixed inset-0 -z-40 h-lvh w-lvw overflow-hidden transition duration-1000"
    >
      <div
        v-for="(offset, indexOffset) in [0, bgStarHeight]"
        :key="indexOffset"
        :style="{
          animation: prefersReducedMotion ? '' : `translateStar ${layer.speed}s linear infinite`,
        }"
      >
        <div
          v-for="(star, indexStar) in layer.stars"
          :key="indexStar"
          class="pointer-events-none absolute transition duration-300"
          :style="{
            top: star.top + offset + 'px',
            left: star.left + 'px',
          }"
          :class="{
            'opacity-0': !isStarVisible,
            'opacity-100': isStarVisible,
          }"
        >
          <img
            src="~/assets/img/frite-background.png"
            alt="moving fry"
            class="h-6 w-auto"
            :style="{
              height: `${layer.height}rem`,
              animation:
                prefersReducedMotion || !isStarRotating
                  ? ''
                  : `rotateStar-${star.rotationDirection} ${star.rotationSpeed}s linear infinite`,
            }"
          />
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { useDebounceFn, useEventListener, usePreferredReducedMotion } from "@vueuse/core"

// Interfaces & Types

interface Star {
  top: number
  left: number
  rotationDirection: string
  rotationSpeed: number
}

interface StarLayer {
  stars: Star[]
  speed: number // n seconds to cross the screen
  height: number // in rem
}

// Constants

const RESET_THRESHOLD_X = 0.1
const RESET_THRESHOLD_Y = 0.2

// Composables

const appConfig = useAppConfig()

// Reactive variables

const bgStarWidth = ref(0)
const bgStarHeight = ref(0)
const preferredMotion = usePreferredReducedMotion()
const isBackgroundBlurred = useState("blurBackground", () => false)
const isStarsEnabled = useCookie("is-stars-enabled", { default: () => true })
const starLayers = ref<StarLayer[]>([])
const isStarRotating = ref(true)
const isStarVisible = ref(false)

// Computed variables

const prefersReducedMotion = computed(() => {
  return preferredMotion.value === "reduce"
})

const starTransformTo = computed(() => {
  return `translateY(-${bgStarHeight.value}px)`
})

const nbStars = computed(() => {
  return ((bgStarHeight.value * bgStarWidth.value) / 40000) * appConfig.starDensity
})

// Watchers

watch(isBackgroundBlurred, (isBlurred: boolean) => {
  if (isBlurred) {
    setTimeout(() => {
      isStarRotating.value = false
    }, 500)
  } else {
    isStarRotating.value = true
  }
})

// Methods

const generateStars = (n: number): Star[] => {
  const stars: Star[] = []

  for (let i = 0; i < n; i++) {
    const star: Star = {
      top: Math.floor(Math.random() * bgStarHeight.value),
      left: Math.floor(Math.random() * bgStarWidth.value),
      rotationDirection: Math.random() > 0.5 ? "clockwise" : "counter-clockwise",
      rotationSpeed: Math.random() * 100 + 10, // Random speed between 10 and 110 seconds
    }

    stars.push(star)
  }
  return stars
}

const setStars = () => {
  bgStarWidth.value = window.innerWidth
  bgStarHeight.value = window.innerHeight
  starLayers.value = [
    { stars: generateStars(nbStars.value * 6), speed: 70, height: 0.5 },
    { stars: generateStars(nbStars.value * 2), speed: 100, height: 0.75 },
    { stars: generateStars(nbStars.value), speed: 150, height: 1.5 },
  ]
}

const resetStars = () => {
  if (
    Math.abs(window.innerWidth - bgStarWidth.value) > bgStarWidth.value * RESET_THRESHOLD_X ||
    Math.abs(window.innerHeight - bgStarHeight.value) > bgStarHeight.value * RESET_THRESHOLD_Y
  )
    setStars()
}

watch(
  isStarsEnabled,
  (isEnabled) => {
    if (isEnabled) {
      setStars()
      setTimeout(() => {
        isStarVisible.value = true
      }, 10)
    } else {
      isStarVisible.value = false
      setTimeout(() => {
        starLayers.value = []
      }, 300)
    }
  },
  { immediate: true },
)

// Lifecycle hooks

onMounted(() => {
  useEventListener(window, "resize", useDebounceFn(resetStars, 200))
})
</script>
<style>
@keyframes translateStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: v-bind("starTransformTo");
  }
}
@keyframes rotateStar-clockwise {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes rotateStar-counter-clockwise {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
