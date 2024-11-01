<!-- src/pages/HomePage.vue -->
<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-50">
    <SearchNavbar @search="fetchVideos" />
    <VideoList :videos="videos" />
  </div>
</template>

<script>
import axios from 'axios';
import SearchNavbar from '../components/SearchNavbar.vue';
import VideoList from '../components/VideoList.vue';
import { ref } from 'vue';

export default {
  name: 'HomePage',
  components: { SearchNavbar, VideoList },
  data() {
    return {
      videos: [],
    };
  },
  methods: {
    async fetchVideos(keyword) {
      try {
        const response = await axios.get(`http://localhost:8080/search`, {
          params: { query: keyword },
        });
        console.log(response.data);
        this.videos = response.data;
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    },
  },
  mounted() {
    // Fetch default videos on mount, if desired
    this.fetchVideos('flutter');
  },
};
</script>
