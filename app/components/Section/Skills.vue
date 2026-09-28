<template>
  <section class="flex min-h-screen items-start justify-center pb-16 md:pb-0 lg:items-center">
    <div class="max-w-screen-lg px-3 sm:px-6 xl:px-0">
      <div v-for="subSection in content" :key="subSection.id" class="mb-6">
        <h2 class="mb-2">
          {{ subSection.title }}
        </h2>
        <div
          class="grid grid-cols-1 gap-4 sm:grid-cols-2"
          :class="[`md:grid-cols-${subSection.groups.length}`]"
        >
          <div
            v-for="group in subSection.groups"
            :id="`skill-${group.id}`"
            :key="`skill-${group.id}`"
          >
            <h3>
              {{ group.title }}
            </h3>
            <div class="flex flex-wrap gap-1 py-2 md:gap-2">
              <SkillItem
                v-for="skill in group.items"
                :id="`skill-${skill.id}`"
                :key="`skill-${skill.id}`"
                :title="skill.title"
                :icon="skill.icon ?? undefined"
                :description="skill.description"
                :opinion="skill.opinion"
                :color="skill.color ?? undefined"
                :level="skill.level"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import content from "~/assets/skills.yaml"
// Props
const props = defineProps<{
  isActive: boolean
}>()
</script>
<style scoped></style>
