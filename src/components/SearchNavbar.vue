<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
    <div class="flex justify-center p-4">
      <div class="flex items-center w-full max-w-[500px]">
        <form @submit.prevent="performSearch" class="flex items-center w-full">
          <input
            type="search"
            v-model="searchQuery"
            placeholder="Cari"
            autocomplete="off"
            class="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none bg-gray-100"
            aria-label="Cari"
          />
          <button type="submit" aria-label="Cari" class="p-2 border border-gray-300 text-black rounded-r-md bg-gray-100 hover:bg-gray-200 focus:outline-none">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="rgba(22, 24, 35, .75)" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"></path>
            </svg>
          </button>
        </form>
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

<style scoped>
/* Add any custom styles here */
</style>
