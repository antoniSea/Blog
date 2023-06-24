<template>
  <Navbar />

  <main>
    <slot />
  </main>

  <NewsletterModal />
</template>

<script setup lang="ts">
import Navbar from "~/components/Layout/Navbar.vue";
import NewsletterModal from "~/components/NewsletterModal.vue";
</script>
