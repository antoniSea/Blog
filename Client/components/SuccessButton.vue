<template>
  <button class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  disabled: boolean;
}

defineProps<Props>();
</script>
