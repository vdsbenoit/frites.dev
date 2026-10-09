<script lang="ts" setup>
import type { SectionId } from '~/data/sections'
import { sectionNumber } from '~/data/sections'

const props = defineProps<{
  id: SectionId
  title: string
  label?: string
  surface?: boolean
}>()

const sectionElement = useTemplateRef('section')
useSectionReadTracking(sectionElement, props.id)
</script>

<template>
  <section
    :id="id"
    ref="section"
    class="scroll-mt-27.5 border-b border-neutral-800"
    :class="{ 'bg-surface': surface }"
  >
    <UContainer class="py-[clamp(56px,10vw,96px)]">
      <SectionHeader :number="sectionNumber(id)" :title="title" :label="label" />
      <slot />
    </UContainer>
  </section>
</template>
