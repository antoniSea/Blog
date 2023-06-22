<template>
  <div>
    <Header link="/dashboard/posts">
      Stwórz post
    </Header>

    <PostForm :form="form" :submitForm="save" />
  </div>
</template>

<script setup lang="ts">
import { PostForm as PostFormInterface } from "~/types/posts/postForm";
import axios from "axios";
import PostForm from "~/components/posts/PostForm.vue";

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const form = reactive<PostFormInterface>({
  title: '',
  content: '',
  processing: false,
  error: '',
  success: false,
});

const save = async (): Promise<void> => {
  try {
    form.processing = true;
    await axios.post(`${useRuntimeConfig().public.API_URL}create-post`, {
      title: form.title,
      content: form.content,
    })
    navigateTo('/dashboard/posts');
  } catch (error: any) {
    form.error = error.response.data.error;
  } finally {
    form.processing = false;
  }
};
</script>
