<!-- src/components/SearchNavbar.vue -->
<template>
    <nav class="p-4 bg-white shadow flex justify-center">
      <div class="flex items-center w-full max-w-md">
        <input
          type="text"
          v-model="searchQuery"
          @keyup.enter="performSearch"
          placeholder="Search TikTok videos..."
          class="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
      </div>
    </nav>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'SearchNavbar',
    emits: ['search'],
    setup(_, { emit }) {
      const searchQuery = ref('');
  
      const performSearch = () => {
        emit('search', searchQuery.value);
      };
  
      return { searchQuery, performSearch };
    },
  };
  </script>
  