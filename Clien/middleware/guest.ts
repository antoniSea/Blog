export default defineNuxtRouteMiddleware((to, from) => {
    const cookie = useCookie('token');

    if (cookie.value) {
        return navigateTo('/dashboard');
    }
});
