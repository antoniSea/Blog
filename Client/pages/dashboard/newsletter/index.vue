<template>
  <Header>
    Statystyki zapisu do newslettera
  </Header>

  <div class="mt-4" v-if="data">
    Osób zapisanych ogółem: {{ data.stats }}
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const data = ref();

onMounted(async () => {
  const {data: response} = await axios.get(`${useRuntimeConfig().public.API_URL}newsletter-stats`);
  data.value = response;
});
</script>
