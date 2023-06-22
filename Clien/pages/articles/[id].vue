<template>
  <div class="max-w-4xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8" v-if="post">
    <div class="flex justify-between">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ post.title }}</h1>

      <nuxt-link href="/">
        powrót
      </nuxt-link>
    </div>
    <h2 class="text-xl text-gray-600 mb-8">By {{ post.author.name }}</h2>
    <p class="text-gray-600 text-lg whitespace-pre-line">{{ post.content }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Post from '~/types/Blog/Post';

const post = ref<Post>();
const route = useRoute();

onMounted(async (): Promise<void> => {
  const { data } = await axios.get(`${useRuntimeConfig().public.API_URL}posts/${route.params.id}`);
  post.value = data.post;
});
</script>
