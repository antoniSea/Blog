<template>
  <nuxt-link :href="href" class="mt-2 dark:hover:bg-gray-500 dark:bg-gray-900  block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white">
    <slot />
  </nuxt-link>
</template>

<script setup lang="ts">
  interface Props {
    href: string;
  }

  defineProps<Props>()
</script>
