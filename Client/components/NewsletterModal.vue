<template>
  <transition name="slide">
    <div v-if="newsletterModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <!-- Modal content -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div v-if="!message.message">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Newsletter
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  <textInput
                      v-model="form.email"
                      type="email"
                      name="email"
                      id="email"
                      autocomplete="email"
                      placeholder="Email"
                  />
                </p>
              </div>
            </div>

            <ErrorCard v-if="message.type === 'error'">
              {{ message.message }}
            </ErrorCard>
            <SuccessCard v-if="message.type === 'success'">
              {{ message.message }}
            </SuccessCard>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <SuccessButton v-if="message.type !== 'success'" type="button" @click="submit" :disabled="form.processing">
              Subscribe
            </SuccessButton>

            <SubmitButton type="button" @click="closeModal" :disabled="form.processing">
              Close
            </SubmitButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { handleNewsletterModal } from '~/helpers/NewsletterModalHelper';
import SuccessButton from "~/components/SuccessButton.vue";
import useNewsletter from '~/composables/useNewsletter';

const { newsletterModal, form, message, closeModal, submit } = useNewsletter();


onBeforeMount(() => {
  setTimeout(() => {
    newsletterModal.value = handleNewsletterModal();
  }, 3000);
});
</script>

<style scoped>
/* Define enter and leave transitions */
.slide-enter-active, .slide-leave-active {
  transition: transform .5s;
}

.slide-enter-from, .slide-leave-to {
  transform: translateY(-100%);
}

.slide-enter-to, .slide-leave-from {
  transform: translateY(0);
}
</style>
