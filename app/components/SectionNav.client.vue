<script lang="ts" setup>
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { sections } from '~/data/sections'

const SECTION_IDS = ['top', ...sections.map(section => section.id)]

const { y, arrivedState } = useWindowScroll()
const { height } = useWindowSize()

// A section counts as current once its top passes the upper third of the viewport
const currentIndex = computed(() => {
  void y.value
  const threshold = height.value / 3
  return SECTION_IDS.findLastIndex(
    id => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= threshold,
  )
})

const isLastSection = computed(
  () => arrivedState.bottom || currentIndex.value >= SECTION_IDS.length - 1,
)

function goToNextSection() {
  const targetId = isLastSection.value ? 'top' : SECTION_IDS[currentIndex.value + 1]
  const section = document.getElementById(targetId!)
  const target = section?.querySelector('[data-section-header]') ?? section
  target?.scrollIntoView()
}
</script>

<template>
  <UButton
    :icon="isLastSection ? 'i-heroicons-arrow-up' : 'i-heroicons-arrow-down'"
    :aria-label="isLastSection ? 'Back to top' : 'Next section'"
    color="neutral"
    variant="outline"
    class="
      fixed right-5 bottom-5 z-50 size-12 cursor-pointer justify-center rounded-[14px]
      bg-[rgba(20,20,20,0.55)] text-neutral-100
      shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_30px_-12px_rgba(0,0,0,0.8)]
      ring-neutral-100/12 backdrop-blur-[20px] backdrop-saturate-180
      hover:bg-neutral-800 hover:text-frite-400
    "
    :ui="{ leadingIcon: 'size-5' }"
    @click="goToNextSection"
  />
</template>
