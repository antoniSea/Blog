<template>
  <div class="dark:bg-gray-800 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
              Tytuł
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
              Zawartość
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
              Akcje
            </th>
          </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">

          <td v-if="posts.length === 0" class="text-center px-6 py-4 whitespace-nowrap" colspan="4">
            <div class="text-sm text-gray-900 dark:text-gray-200">Brak postów</div>
          </td>

          <tr v-for="(post, index) in posts" :key="index">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-gray-200">{{ post.id }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-gray-200">{{ post.title }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-gray-200">{{ post.content }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <DangerButton @click="deletePost(post.id)" :disabled="processing" class="dark:bg-red-600 dark:hover:bg-red-700 dark:border-red-700 dark:text-white">
                Usuń
              </DangerButton>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DangerButton from "~/components/DangerButton.vue";
import axios from "axios";

interface Props {
  posts: any
}
defineProps<Props>()

const processing = ref<boolean>(false);

const emit = defineEmits({
  deletePost: (id: number) => true
});

const deletePost = async (id: number): Promise<void> => {
  processing.value = true;
  try {
    await axios.delete(`${useRuntimeConfig().public.API_URL}posts/${id}`)

    emit('deletePost', id);
  } catch (error: any) {
    console.log(error.response.data.error);
  } finally {
    processing.value = false;
  }
}

</script>
