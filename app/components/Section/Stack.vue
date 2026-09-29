<template>
  <AppSection id="stack" title="The stack" label="Tap for detail" surface>
    <div class="mt-12 flex flex-col gap-10">
      <div v-for="group in stack" :key="group.title">
        <h3 class="mb-1 text-lg font-semibold text-neutral-100">{{ group.title }}</h3>
        <p class="mb-6 text-sm text-neutral-500">{{ group.caption }}</p>
        <div class="flex flex-wrap gap-x-[18px] gap-y-3.5">
          <SkillItem v-for="skill in group.items" :key="skill.title" :skill="skill" />
        </div>
      </div>
    </div>
  </AppSection>
</template>

<script lang="ts" setup>
import { stack } from "~/data/stack"
</script>
