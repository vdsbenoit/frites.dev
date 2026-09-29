<script lang="ts" setup>
const props = withDefaults(defineProps<{ iconClass?: string, withEmail?: boolean }>(), {
  iconClass: 'size-5',
  withEmail: false,
})

const LINKS = [
  { label: 'GitHub profile', to: 'https://github.com/vdsbenoit', icon: 'i-simple-icons-github' },
  {
    label: 'GitLab profile',
    to: 'https://gitlab.com/users/vdsbenoit/projects',
    icon: 'i-simple-icons-gitlab',
  },
  {
    label: 'LinkedIn profile',
    to: 'https://linkedin.com/in/vdsbenoit',
    icon: 'i-simple-icons-linkedin',
  },
  {
    label: 'Email Benoit',
    to: 'mailto:benoit@frites.dev',
    icon: 'i-heroicons-envelope-solid',
    isEmail: true,
  },
]

const visibleLinks = computed(() => LINKS.filter(link => props.withEmail || !link.isEmail))
</script>

<template>
  <div class="flex items-center gap-4.5">
    <ULink
      v-for="link in visibleLinks"
      :key="link.label"
      :to="link.to"
      :target="link.isEmail ? undefined : '_blank'"
      :aria-label="link.label"
      raw
      class="
        flex transition-colors
        hover:text-frite-400
      "
    >
      <UIcon :name="link.icon" :class="iconClass" />
    </ULink>
  </div>
</template>
