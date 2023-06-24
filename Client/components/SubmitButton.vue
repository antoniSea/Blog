<template>
  <button :disabled="disabled" class="px-4 py-2 bg-blue-600 rounded-md text-white disabled:bg-gray-500 hover:bg-blue-800">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  disabled: boolean
}

defineProps<Props>()
</script>
