<template>
  <h1 class="text-4xl font-semibold">
    Dashboard
  </h1>

  <div class="flex flex-wrap items-start mt-4">
    <div v-for="user in users" :key="user.id" class="mr-3 mb-3">
      <nuxt-link :to="`dashboard/users/${user.id}`">
        <UserCard :user="user" />
      </nuxt-link>
    </div>
  </div>

  <nuxt-link class="block mt-4" :to="'dashboard/users/create'">
    <SubmitButton>
      Dodaj użytkownika
    </SubmitButton>
  </nuxt-link>
</template>

<script setup>
import axios from "axios";

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const users = ref([]);

onMounted(async () => {
  const { data: response } = await axios.get(`${useRuntimeConfig().public.API_URL}all-users`);

  users.value = response;
});
</script>

