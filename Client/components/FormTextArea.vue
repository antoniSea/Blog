<!-- ~/components/CustomTextarea.vue -->
<template>
  <div class="mb-4">
    <label class="block dark:text-white text-gray-700 text-sm font-bold mb-2" :for="textareaId">
      {{ label }}
    </label>
    <textarea
        class="shadow appearance-none w-[50%] dark:bg-gray-700 border dark:border-gray-700 dark:text-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        :id="textareaId"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
  defineProps({
  label: {
    type: String,
    required: true,
  },
  textareaId: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
    required: false,
  },
});
</script>
