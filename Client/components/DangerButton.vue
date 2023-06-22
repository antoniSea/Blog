<template>
  <button :disabled="disabled" class="disabled:bg-gray-500 bg-red-500 rounded text-white px-4 py-2">
    <slot />
  </button>
</template>

<script setup lang="ts">
  interface Props {
    disabled: boolean|null
  }

  defineProps<Props>();
</script>

