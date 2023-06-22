<!-- ~/components/CustomInput.vue -->
<template>
  <div class="mb-4">
    <label class="block dark:text-white text-gray-700 text-sm font-bold mb-2" :for="inputId">
      {{ label }}
    </label>
    <input
        class="shadow appearance-none w-[50%] dark:bg-gray-700 border dark:border-gray-700 dark:text-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        :id="inputId"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    inputId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    placeholder: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: false,
    },
  },
});
</script>
