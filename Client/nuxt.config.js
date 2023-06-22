export default {
  devtools: {
    enabled: true
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_BASE_URL,
    }
  }
};
