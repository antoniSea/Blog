<template>
  <form @submit.prevent="submitForm">
    <TextInput
        label="Tytuł"
        inputId="title"
        placeholder="Tytuł"
        v-model="form.title"
        class="mt-4"
    />

    <FormTextArea
        label="Zawartość"
        textareaId="content"
        placeholder="Zawartość"
        v-model="form.content"
        class="mt-4"
    />

    <SubmitButton :disabled="form.processing">
      Zapisz
    </SubmitButton>
  </form>
</template>

<script setup lang="ts">
import CustomInput from "~/components/TextInput.vue";
import FormTextArea from "~/components/FormTextArea.vue";
import SubmitButton from "~/components/SubmitButton.vue";

interface Props {
  form: any
  submitForm: any
}

defineProps<Props>()
</script>
