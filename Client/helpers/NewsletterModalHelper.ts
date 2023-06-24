import axios from "axios";

const canShowModal = (): boolean => {
    return localStorage.getItem("newsletter") !== "true";
};

const handleNewsletterModal = (): boolean => {
    useState('newsletterModal', () => canShowModal());

    return canShowModal();
};

const markAsRead = () => {
    return localStorage.setItem("newsletter", "true");
}

const handleClosing = () => {
    markAsRead();
    useState('newsletterModal', () => false);

    return handleNewsletterModal();
};

const submitNewsletter = async (email: any) => {
    try {
        const {data: response} = await axios.post(`${useRuntimeConfig().public.API_URL}create-newsletter-entry`, { email });
        markAsRead();

        return {
            message: true,
            data: response
        };
    } catch (e: any) {
        return {
            message: false,
            data: e.response.data
        }
    }
};

export {
    handleNewsletterModal,
    handleClosing,
    submitNewsletter,
};
