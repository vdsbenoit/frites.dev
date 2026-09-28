<template>
  <div
    class="flex items-center *:transition motion-safe:hover:*:-translate-y-1 motion-safe:hover:*:scale-110"
  >
    <NuxtLink to="https://github.com/vdsbenoit" target="_blank" aria-label="GitHub Profile">
      <UIcon :name="blackAndWhite ? 'i-simple-icons-github' : 'i-simple-icons-github'" size="20" />
    </NuxtLink>
    <NuxtLink
      to="https://gitlab.com/users/vdsbenoit/projects"
      target="_blank"
      aria-label="GitLab Profile"
    >
      <UIcon
        :name="blackAndWhite ? 'i-simple-icons-gitlab' : 'i-vscode-icons-file-type-gitlab'"
        :size="blackAndWhite ? 20 : 23"
      />
    </NuxtLink>
    <NuxtLink to="https://linkedin.com/in/vdsbenoit" target="_blank" aria-label="LinkedIn Profile">
      <UIcon
        :name="blackAndWhite ? 'i-simple-icons-linkedin' : 'i-logos-linkedin-icon'"
        size="20"
      />
    </NuxtLink>
    <NuxtLink to="mailto:benoit@frites.dev" target="_blank" aria-label="Send Email">
      <UIcon
        :name="blackAndWhite ? 'i-simple-icons-gmail' : 'i-logos-google-gmail'"
        :size="blackAndWhite ? 26 : 20"
      />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  blackAndWhite: { type: Boolean, default: false },
})
</script>

<style scoped></style>
