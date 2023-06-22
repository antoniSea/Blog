<template>
  <h1 class="text-4xl font-semibold">
    Dashboard
  </h1>

  <div class="flex items-start mt-4">
    <div v-for="user in users">
      <nuxt-link :href="`dashboard/users/${user.id}`">
        <UserCard class="mr-3" :user="user" />
      </nuxt-link>
    </div>
  </div>

  <nuxt-link class="block mt-4" href="dashboard/users/create">
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
