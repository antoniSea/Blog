<template>
  <nav class="bg-gray-800">
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
          <div class="hidden sm:block">
            <div class="flex justify-between">
              <router-link to="/" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
              <router-link to="/auth/login" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Zaloguj</router-link>
            </div>
          </div>
      </div>
    </div>
  </nav>
</template>
