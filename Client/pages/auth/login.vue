<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="submitForm">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" v-model="form.email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" v-model="form.password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
          </div>
        </div>

        <div>
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Zapomniałeś hasła?
            </a>
          </div>
        </div>

        <div>
          <button :disabled="form.processing" type="submit" class="disabled:bg-gray-500 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Panel
          </button>
        </div>

        <div class="text-red-500">
          {{ form.error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LoginParams from "~/types/Auth/login";
  import axios from 'axios';
  import guest from "~/middleware/guest";

  definePageMeta({
    middleware: [ guest ],
  });

  const form = reactive<LoginParams>({
    email: '',
    password: '',
    error: '',
    processing: false,
  });

  const submitForm = async (): Promise<void> => {
    try {
      form.processing = true;
      const { data } = await axios.post(`${useRuntimeConfig().public.API_URL}require-token`, form);

      const token = useCookie('token');
      token.value = data.token;

      navigateTo('/dashboard');
    } catch (error: any) {
      form.error = error.response.data.error;
    } finally {
      form.processing = false;
    }
  };
</script>
`
