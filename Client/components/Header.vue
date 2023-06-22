<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-semibold">
      <slot></slot>
    </h1>

    <nuxt-link :to="link" v-if="link">
      Powrót
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
interface Props {
  link: string
}

defineProps<Props>();
</script>
