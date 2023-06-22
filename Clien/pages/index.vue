<template>
  <div class="max-w-4xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Blog Posts</h1>
    <div v-for="post in posts" :key="post.id" class="mb-6 bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2 class="text-xl font-bold text-gray-900">{{ post.title }}</h2>
        <p class="text-sm text-gray-600">By {{ post.author.name }}</p>
      </div>
      <div class="px-4 py-5 border-t border-gray-200 sm:px-6">
        <div class="text-sm text-gray-600">
          {{ post.content.substring(0, 200) }}...
          <router-link :to="`articles/${post.id}`" class="text-blue-500 hover:text-blue-700">Read More</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Post from '~/types/Blog/Post';

const posts = ref<any[]>([]);

onMounted(async (): Promise<void> => {
  const { data } = await axios.get(`${useRuntimeConfig().public.API_URL}all-posts`);
  posts.value = data.posts.data;
});
</script>
