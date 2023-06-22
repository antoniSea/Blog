<template>
  <TextInput
      label="Nazwa"
      inputId="username"
      placeholder="Username"
      v-model="form.name"
  />

  <TextInput
      label="Email"
      inputId="email"
      placeholder="Email"
      v-model="form.email"
  />

  <TextInput
      label="Hasło"
      inputId="password"
      placeholder="Password"
      type="password"
      v-model="form.password"
  />

  <SubmitButton class="mb-4" @click="create" :disabled="form.processing">
    Stwórz
  </SubmitButton>
</template>


<script setup lang="ts">
  import UserForm from '~/types/Dashboard/UserForm';
  import axios from 'axios';

  const form = reactive<UserForm>({
    name: '',
    email: '',
    password: '',
    processing: false,
    error: '',
  });

  definePageMeta({
    layout: 'dashboard',
    middleware: 'auth',
  });

  const create = async (): Promise<void> => {
    try {
      form.processing = true;
      await axios.post(`${useRuntimeConfig().public.API_URL}create-user`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigateTo('/dashboard');
    } catch (error: any) {
      form.error = error.response.data.error;
    } finally {
      form.processing = false;
    }
  };
</script>
