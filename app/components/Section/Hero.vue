<template>
  <section class="flex min-h-screen items-center justify-center">
    <div>
      <div id="background-clip" :style="{ clipPath }"></div>
      <h1 ref="heroTitle" class="relative mt-3 px-0.5 text-center font-bold tracking-tight sm:px-2">
        <span
          class="anim-bring-in block bg-gradient-to-t from-gray-400 to-white bg-clip-text text-[28px] text-transparent sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-normal xl:text-7xl xl:leading-relaxed"
        >
          Empower your business
        </span>
        <div class="flex w-full justify-center">
          <div>
            <div
              class="w-0 overflow-hidden bg-gradient-to-t from-gray-400 to-white bg-clip-text text-lg whitespace-nowrap text-transparent sm:text-3xl lg:text-4xl xl:text-5xl"
              :class="{ 'typewriter-effect': isActive }"
            >
              with tailored
              <span class="decoration-primary underline underline-offset-4">
                software solutions</span
              >
            </div>
          </div>
        </div>
      </h1>
      <div
        class="focus:*:ring-primary-200 mt-8 grid grid-cols-1 justify-items-center gap-2 font-semibold *:w-48 *:rounded-lg *:py-2 *:text-center *:shadow-xl *:transition *:ease-in focus:*:ring-2 focus:*:outline-none motion-safe:hover:*:scale-110 sm:grid-cols-2 sm:justify-normal sm:gap-4 sm:*:w-52"
      >
        <a
          href="#profile"
          class="bg-primary-400 hover:bg-primary-300 active:bg-primary-500 inline-block text-gray-800 sm:justify-self-end"
        >
          About me
        </a>
        <a
          href="#contact"
          class="inline-block border border-gray-700 bg-gray-800 text-gray-100 hover:bg-gray-700 active:bg-gray-900 sm:justify-self-start"
        >
          Let's talk
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useElementBounding } from "@vueuse/core"

// Props

const props = defineProps<{
  isActive: boolean
}>()

const heroTitle = ref<HTMLInputElement | null>(null)
const heroTitleRect = useElementBounding(heroTitle)
const isBackgroundBlurred = useState("blurBackground")

const clipPath = computed(() => {
  if (!heroTitleRect.left.value) return ""
  return `polygon(${heroTitleRect.left.value}px ${heroTitleRect.top.value}px, ${heroTitleRect.right.value}px ${heroTitleRect.top.value}px, ${heroTitleRect.right.value}px ${heroTitleRect.bottom.value}px, ${heroTitleRect.left.value}px ${heroTitleRect.bottom.value}px)`
})

watch(
  () => props.isActive,
  (isActive: boolean) => {
    isBackgroundBlurred.value = !isActive
  },
  { immediate: true },
)
</script>

<style scoped>
#background-clip {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at bottom, #262626 0%, #0a0a0a 100%);
  z-index: -1;
}
@keyframes bringIn {
  from {
    opacity: 0.1;
  }
  to {
    opacity: 1;
  }
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
    padding: 0 5px 0 0;
  }
}
/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #f5f5f5;
  }
}

.anim-bring-in {
  animation: bringIn 1s;
}

/* Credits : https://css-tricks.com/snippets/css/typewriter-effect/ */
.typewriter-effect {
  overflow: hidden;
  border-right: 0.15em solid transparent;
  white-space: nowrap;
  margin: 0 auto;
  /* letter-spacing: .15em; */
  animation:
    typing 1.5s steps(30, end) both,
    blink-caret 0.75s step-end infinite;
}
@media (prefers-reduced-motion) {
  .anim-bring-in {
    animation: none;
  }
  .typewriter-effect {
    animation: none;
  }
}
</style>
