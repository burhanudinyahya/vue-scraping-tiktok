<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-50 pt-20">
    <SearchNavbar :initialKeyword="keyword" @search="onSearch" />
    <div v-if="loading">
      <h1>Loading...</h1>
      <!-- <Shimmer class="w-full h-52" /> -->
    </div>
    <div v-else>
      <ImageList :videos="videos" />
    </div>
  </div>
</template>

<script>
import SearchNavbar from '../components/SearchNavbar.vue';
import ImageList from '../components/ImageList.vue';
import Shimmer from '../components/Shimmer.vue';

export default {
  name: 'HomePage',
  components: { SearchNavbar, ImageList, Shimmer },
  data() {
    return {
      videos: [],
      keyword: localStorage.getItem('searchKeyword') || this.$route.query.q || '',
      loading: false, // New loading state
    };
  },
  methods: {
    async fetchVideos(keyword) {
      // Set loading state to true
      this.videos = []
      this.loading = true;

      // const cachedResult = localStorage.getItem(`search_${keyword}`);
      // if (cachedResult) {
      //   this.videos = JSON.parse(cachedResult);
      //   this.loading = false; // Hide shimmer effect after loading
      //   return;
      // }

      // try {
      //   const response = await axios.get(`http://localhost:8000/search`, {
      //     params: { q: keyword },
      //   });
      //   this.videos = response.data;
      //   localStorage.setItem(`search_${keyword}`, JSON.stringify(response.data));
      // } catch (error) {
      //   console.error('Error fetching videos:', error);
      // } finally {
      //   this.loading = false; // Hide shimmer effect after loading
      // }
      fetch(`http://localhost:8000/stream?q=${keyword}`)
        .then(response => {
            const reader = response.body.getReader();
            return new ReadableStream({
                start(controller) {
                    function push() {
                        reader.read().then(({ done, value }) => {
                            if (done) {
                                controller.close();
                                return;
                            }
                            // Convert Uint8Array to string and enqueue
                            controller.enqueue(value);
                            push();
                        });
                    }
                    push();
                }
            });
        })
        .then(stream => new Response(stream))
        .then(response => {
            const reader = response.body.getReader();
            let decoder = new TextDecoder(); // Create a TextDecoder to decode bytes

            const readStream = () => {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        // console.log("Stream finished");
                        // localStorage.setItem(`search_${keyword}`, JSON.stringify(this.videos));
                        this.loading = false; 
                        return;
                    }

                    const chunk = decoder.decode(value, { stream: true });
                    try {
                        const videoData = JSON.parse(chunk);
                        this.videos.push(videoData); // Update this to spread if needed
                        this.loading = false; 
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                    readStream();
                });
            };
            readStream();
        })
        .catch(error => {
            console.error("Error fetching stream:", error);
        });
    },
    onSearch(keyword) {
      if (keyword.trim() === '') return;

      localStorage.setItem('searchKeyword', keyword);
      this.$router.push({ query: { q: keyword } }).catch(() => {});

      this.fetchVideos(keyword);
    },
  },
  mounted() {
    if (this.keyword) {
      this.fetchVideos(this.keyword);
    }
  },
};
</script>
