import { ref } from 'vue';
import { handleClosing, submitNewsletter } from '~/helpers/NewsletterModalHelper';

interface Message {
    type: string;
    message: string;
}

export default function useNewsletter() {
    const newsletterModal = ref(false);
    const form = ref({
        email: '',
        progress: false,
    });
    const message = ref<Message>({
        type: 'none',
        message: '',
    });

    const closeModal = () => {
        newsletterModal.value = handleClosing();
    };

    const showResults = (result: any) => {
        const messageFailValue = {
            type: 'error',
            message: result.data.message
        };

        const messageSuccessValue = {
            type: 'success',
            message: 'Dziękuję za zapisanie się do newslettera',
        };

        message.value = result.message ? messageSuccessValue : messageFailValue;
    };

    const submit = async () => {
        form.value.progress = true;

        await submitNewsletter(form.value.email).then((res) => {
            showResults(res);
        });

        form.value.progress = false;
    };

    return {
        newsletterModal,
        form,
        message,
        closeModal,
        submit,
    };
}
