<template>
  <div class="max-w-sm dark:bg-black bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div class="md:flex">
      <div class="p-8">
        <div class="uppercase dark:text-indigo-200 tracking-wide text-sm text-indigo-500 font-semibold">{{ user.email }}</div>
        <p class="block dark:text-white mt-1 text-lg leading-tight font-medium text-black">{{ user.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  user: {
    name: string;
    email: string;
  }
}

defineProps<Props>()
</script>
