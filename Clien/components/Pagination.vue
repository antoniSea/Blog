<template>
  <nav class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between sm:px-6">
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700 dark:text-gray-200">
        Showing
        <span class="font-medium">{{ from + 1 }}</span>
        to
        <span class="font-medium">{{ to }}</span>
        of
        <span class="font-medium">{{ dataLength }}</span>
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end">
      <nuxt-link :to="previousPageLink" class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
        Previous
      </nuxt-link>
      <nuxt-link :to="nextPageLink" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
        Next
      </nuxt-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  previousPageLink: string
  nextPageLink: string
  from: number
  to: number
  dataLength: number
}

defineProps<Props>()
</script>
