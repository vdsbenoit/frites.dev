<template>
  <div class="flex items-baseline gap-4 border-b-2 border-frite-400 pb-3.5">
    <span v-if="number" class="font-mono text-xs text-frite-400">{{ number }}</span>
    <component
      :is="as"
      class="text-[clamp(28px,4vw,44px)] leading-[1.2] font-bold tracking-[-0.025em] text-neutral-100"
    >
      {{ title }}
    </component>
    <span
      v-if="label"
      class="ml-auto font-mono text-[11px] tracking-[0.08em] whitespace-nowrap text-neutral-500 uppercase"
    >
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string
    number?: string
    label?: string
    as?: "h1" | "h2"
  }>(),
  { number: undefined, label: undefined, as: "h2" },
)
</script>
