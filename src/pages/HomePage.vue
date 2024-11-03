<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-50 pt-20">
    <SearchNavbar :initialKeyword="keyword" @search="onSearch" />
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-else>
      <ImageList :videos="videos" />
    </div>
  </div>
</template>

<script>
import SearchNavbar from '../components/SearchNavbar.vue';
import ImageList from '../components/ImageList.vue';

export default {
  name: 'HomePage',
  components: { SearchNavbar, ImageList },
  data() {
    return {
      videos: [],
      keyword: this.$route.query.q || '',
      loading: false,
    };
  },
  methods: {
    async fetchVideos(keyword) {
      this.videos = [];
      this.loading = true;

      const cachedResults = localStorage.getItem(`search_${keyword}`);
      if (cachedResults) {
        this.videos = JSON.parse(cachedResults);
        this.loading = false;
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/stream?q=${keyword}`);
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const stream = new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                push();
              });
            }
            push();
          }
        });
        const videoResponse = new Response(stream);
        const videoReader = videoResponse.body.getReader();
        const readStream = () => {
        videoReader.read().then(({ done, value }) => {
          if (done) {
            this.loading = false;
            localStorage.setItem(`search_${keyword}`, JSON.stringify(this.videos));
            return;
          }
          const chunk = decoder.decode(value, { stream: true });
          try {
            const videoData = JSON.parse(chunk);
            this.videos = [...this.videos, videoData]; // Ensure reactivity
            this.loading = false;
            localStorage.setItem(`search_${keyword}`, JSON.stringify(this.videos));
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
          readStream(); // Call the function recursively
        });
      };
        readStream();
      } catch (error) {
        console.error("Error fetching stream:", error);
        this.loading = false;
      }
    },
    onSearch(keyword) {
      // console.log(keyword);
      if (keyword.trim() === '') return;

      this.$router.push({ query: { q: keyword } }).catch(() => {});

      this.fetchVideos(keyword);
    },
  },
  mounted() {
    if (this.keyword) {
      // localStorage.setItem('searchKeyword', this.keyword);
      const cachedResults = localStorage.getItem(`search_${this.keyword}`);
      if (cachedResults) {
        this.videos = JSON.parse(cachedResults);
      } else {
        this.fetchVideos(this.keyword);
      }
    }
  },
};
</script>
