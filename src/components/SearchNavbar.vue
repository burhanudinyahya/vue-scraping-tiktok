<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
    <div class="flex justify-center p-4">
      <div class="flex items-center w-full max-w-[800px]">
        <input
          type="text"
          v-model="searchQuery"
          @keyup.enter="performSearch"
          placeholder="Search videos..."
          class="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          @click="performSearch"
          class="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'SearchNavbar',
  props: {
    initialKeyword: {
      type: String,
      default: '',
    },
  },
  emits: ['search'],
  setup(props, { emit }) {
    const searchQuery = ref('');

    // Set searchQuery to the initialKeyword on component mount
    onMounted(() => {
      searchQuery.value = props.initialKeyword;
    });

    const performSearch = () => {
      emit('search', searchQuery.value);
    };

    return { searchQuery, performSearch };
  },
};
</script>
