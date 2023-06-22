import axios from "axios";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const cookie = useCookie('token');

    if (!cookie.value) {
        return navigateTo('/auth/login');
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${cookie.value}`;
    try {
        const nuxtApp = useNuxtApp();

        const r = await axios.get(`${useRuntimeConfig().public.API_URL}user`)

        try {
            nuxtApp.provide('user', r.data)
        } catch (err: any) { }
    } catch (e: any) {
        return navigateTo('/auth/login');
    }
});
