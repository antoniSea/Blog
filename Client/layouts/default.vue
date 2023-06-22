<template>
  <Navbar />
  <main>
    <slot />
  </main>
</template>
<script setup lang="ts">
import Navbar from "~/components/Layout/Navbar.vue";
</script>
