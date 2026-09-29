<template>
  <AppSection id="work" title="Selected work">
    <div class="mt-12 flex flex-col gap-8">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.name"
        :project="project"
        :reverse="index % 2 === 1"
      />
    </div>
  </AppSection>
</template>

<script lang="ts" setup>
import { projects } from "~/data/projects"
</script>
