<template>
  <div class="flex flex-col">
    <Header class="mb-4">
      Posty
    </Header>

    <Spinner v-if="loading" />

    <div v-else>
      <PostTable :posts="posts.data" @delete-post="deletePost" />
      <Pagination
          :data-length="posts.data.length"
          :from="posts.links.from"
          :to="posts.links.to"
          :previousPageLink="previousPageLink"
          :nextPageLink="nextPageLink"
      />
    </div>
  </div>

  <nuxt-link to="posts/create" class="text-white bg-green-500 px-4 py-2 rounded">
    Stwórz nowy post
  </nuxt-link>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import axios from "axios";
import PostTable from "~/components/posts/PostTable.vue";
import Spinner from "~/components/Spinner.vue";

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const posts = ref({ data: [], links: {} });
const route = useRoute();
const page = ref(route.query.page || 1);
const loading = ref<boolean>(true);

const fetchPosts = async (): Promise<void> => {
  const { data } = await axios.get(`${useRuntimeConfig().public.API_URL}all-posts?page=${page.value}`);
  posts.value = data;
  loading.value = false;
}

onMounted(async () => {
  await fetchPosts();
});

const previousPageLink = computed((): string => '?page=' + (posts.value.links?.currentPage - 1) );

const nextPageLink = computed((): string => '?page=' + (posts.value.links?.currentPage + 1) );

watchEffect((): void => {
  page.value = route.query.page || 1;
  fetchPosts();
});
const deletePost = (): void => {
  fetchPosts();
}
</script>
