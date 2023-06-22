<template>
  <button :disabled="disabled" class="px-4 py-2 bg-blue-500 rounded text-white disabled:bg-gray-500">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  disabled: boolean
}

defineProps<Props>()
</script>
