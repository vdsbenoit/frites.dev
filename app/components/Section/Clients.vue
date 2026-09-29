<script lang="ts" setup>
import { testimonials } from '~/data/testimonials'

function initials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
</script>

<template>
  <AppSection id="clients" title="What they say about me" surface>
    <UCarousel
      v-slot="{ item }"
      :items="testimonials"
      align="start"
      dots
      :ui="{
        root: 'mt-10',
        container: '-ms-5 items-stretch',
        item: 'basis-[max(280px,calc((100%-40px)/3))] ps-5',
        dots: 'static mt-6 justify-start gap-1.5',
        dot: `
          size-1.5 rounded-[3px] bg-neutral-700 transition-[width,background-color] duration-300
          data-[state=active]:w-5.5 data-[state=active]:bg-frite-400
        `,
      }"
    >
      <figure
        class="
          flex h-full flex-col rounded-[4px] border border-t-2 border-neutral-800 border-t-frite-400
          bg-neutral-950 p-[clamp(20px,5vw,28px)]
        "
      >
        <blockquote class="flex-1 text-base leading-[1.65] text-pretty text-neutral-100">
          {{ item.quote }}
        </blockquote>
        <figcaption class="mt-6 border-t border-neutral-800 pt-4.5">
          <UUser
            :name="item.name"
            :description="item.role"
            :avatar="{
              text: initials(item.name),
              ui: { fallback: 'font-bold text-frite-400' },
            }"
            :ui="{
              name: 'text-sm font-semibold text-neutral-100',
              description: 'font-mono text-[11px] text-neutral-500',
              avatar: 'size-9 rounded-[4px] bg-neutral-800 text-[13px]',
            }"
          />
        </figcaption>
      </figure>
    </UCarousel>
  </AppSection>
</template>
