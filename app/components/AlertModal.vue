<template>
  <UModal v-model="isOpen" prevent-close :ui="{ width: 'w-full sm:max-w-sm' }">
    <UAlert
      :description="description"
      :title="title"
      :ui="{ title: 'font-semibold', description: 'mt-3 ', padding: 'sm:pl-7 sm:py-5' }"
      :close-button="{
        icon: 'i-heroicons-x-mark-20-solid',
        color: 'gray',
        variant: 'link',
        padded: false,
      }"
      @close="modal.close()"
    />
  </UModal>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
  description?: string
}>()
const isOpen = ref(false)
const modal = useModal()
</script>

<style scoped></style>
