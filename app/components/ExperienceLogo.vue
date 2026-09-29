<script lang="ts" setup>
import type { Experience } from '~/data/experiences'

const props = defineProps<{ experience: Experience }>()

const size = computed(() => ({
  width: `${props.experience.logo.size}px`,
  height: `${props.experience.logo.size}px`,
}))
</script>

<template>
  <span
    class="
      relative flex size-full items-center justify-center overflow-hidden rounded-full
      after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_0_1px_#404040]
    "
    :style="{ backgroundColor: experience.logo.background }"
  >
    <img
      v-if="experience.logo.src"
      :src="experience.logo.src"
      :alt="`${experience.company} icon`"
      class="object-contain"
      :style="size"
    >
    <UIcon
      v-else-if="experience.logo.icon"
      :name="experience.logo.icon"
      :aria-label="`${experience.company} icon`"
      class="text-neutral-100"
      :style="size"
    />
  </span>
</template>
