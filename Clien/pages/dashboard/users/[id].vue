<template>
  <h1 class="flex justify-between">
    <span class="text-4xl font-semibold flex justify-between">
      Dashboard
    </span>

    <nuxt-link href="/dashboard">
      wróć
    </nuxt-link>
  </h1>

  <div v-if="user" class="mt-4">
    <TextInput
        label="Nazwa"
        inputId="username"
        placeholder="Username"
        v-model="user.name"
    />

    <textInput
        label="Email"
        inputId="email"
        placeholder="Email"
        v-model="user.email"
    />

    <div v-if="saved" class="my-4 text-green-500">
      Zapisano!
    </div>

    <button @click="update" :disabled="processing" class="bg-blue-500 rounded text-white px-4 py-2 disabled:bg-gray-500">
      Zapisz
    </button>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import User from "~/types/Dashboard/users";

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const user = ref<User>();
const userId: string|string[] = useRoute().params.id;
const saved = ref<boolean>(false);
const processing = ref<boolean>(false);

onMounted(async () => {
  console.log(useRuntimeConfig())
  const { data: response } = await axios.get(`${useRuntimeConfig().public.API_URL}users/${userId}`);
  user.value = response;
});

const update = async (): Promise<void> => {
  processing.value = true;
  const response = await axios.put(`${useRuntimeConfig().public.API_URL}users/${userId}`, user.value);
  user.value = response.data.data;

  saved.value = true;
  setTimeout(() => {
    saved.value = false;
  }, 2000);

  processing.value = false;
};
</script>
