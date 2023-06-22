<template>
  <div class="dark:bg-black flex h-screen bg-gray-200">
    <div :class="isSidebarExpanded ? 'w-64' : 'w-32'" class="dark:bg-gray-800 transition-all duration-200 ease-in-out p-5 bg-white rounded-r-3xl"
         @mouseover="expandSidebar" @mouseleave="collapseSidebar">
      <h2 class="text-3xl font-semibold mb-4 dark:text-white" v-show="isSidebarExpanded">Dashboard</h2>

      <input type="checkbox" id="darkModeSwitch" v-model="isDarkMode">
      <label for="darkModeSwitch" class="dark:text-white">Dark Mode</label>

      <nav class="dark:text-white mt-4">
        <nuxt-link href="/" class="dark:hover:bg-gray-500 dark:bg-gray-900  block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white">
          Strona główna
        </nuxt-link>
        <nuxt-link href="/dashboard" class="dark:hover:bg-gray-500 dark:bg-gray-900  block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white">
          Users
        </nuxt-link>
        <nuxt-link href="/dashboard/posts" class="dark:hover:bg-gray-500 dark:bg-gray-900  block py-2.5 px-4 rounded mt-2 transition duration-200 hover:bg-blue-400 hover:text-white">
          Posts
        </nuxt-link>
        <button class="dark:bg-gray-900 dark:hover:bg-gray-500 block py-2.5 px-4 rounded mt-2 transition duration-200 hover:bg-blue-400 hover:text-white" @click="logOut">
          Log out
        </button>
      </nav>
    </div>
    <div class="flex-1 p-10">
      <div class="rounded bg-white p-8 dark:bg-gray-800 dark:text-white">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from "axios";

  const isDarkMode = ref<boolean>(false);
  const isSidebarExpanded = ref<boolean>(false);
  const nuxt = useNuxtApp();

  onMounted(async () => {
    isDarkMode.value = nuxt.$user.darkMode;
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    watch(isDarkMode, async (value: boolean) => {
      if (value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      await axios.post(`${useRuntimeConfig().public.API_URL}toggle-dark-mode`, {});
    });
  });

  const expandSidebar = (): void => {
    isSidebarExpanded.value = true;
  }

  const collapseSidebar = (): void => {
    isSidebarExpanded.value = false;
  }

  const logOut = () => {
    const token = useCookie('token')
    token.value = null;

    navigateTo('/auth/login')
  };
</script>
