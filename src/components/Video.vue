<template>
  <div class="video-page">
    <button class="close-button" @click="goBack">✕</button>
    
    <div class="video-column">
      <vue-plyr :options="{ controls: ['play', 'progress', 'mute', 'volume'], autoplay: true }">
        <video :src="videoUrl" playsinline class="video-player" @loadeddata="onLoadedData"></video>
      </vue-plyr>
      <div v-if="loading" class="loading-spinner"></div>
    </div>
    
    <div class="metadata-column">
      <div class="user-profile">
        <span class="username">{{ videoUsername }}</span>
        <a :href="videoUrlOriginal" target="_blank" class="profile-link-button">Visit Original</a>
      </div>
      <div class="video-info">
        <p class="title">{{ videoTitle }}</p>
        <div class="stats">
          <span class="stat-item">💬 {{ videoComments }} Comments</span>
          <span class="stat-item">❤️ {{ videoLikes }} Likes</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePlyr from 'vue-plyr/dist/vue-plyr.esm';
import 'plyr/dist/plyr.css';
import { mapState } from 'vuex';

export default {
  name: 'Video',
  components: {
    VuePlyr,
  },
  data() {
    return {
      loading: true,
      userProfileUrl: 'https://example.com/user-profile', // Set the URL dynamically if needed
    };
  },
  computed: {
    ...mapState([
      'videoUrlOriginal',
      'videoUrl',
      'videoTitle',
      'videoUsername',
      'videoComments',
      'videoLikes',
    ]),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onLoadedData() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.video-page {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  flex-direction: row;
}

.video-column {
  flex: 2;
  display: flex;
  justify-content: center;
  position: relative;
}

.metadata-column {
  flex: 1;
  background: white;
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
}

.video-player {
  width: 100%;
  object-fit: contain;
}

.user-profile {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Align username to the left and link to the right */
  margin-bottom: 10px;
}

.username {
  font-weight: bold;
  color: #333;
}

.profile-link-button {
  font-size: 0.9em;
  color: #0066cc;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid #0066cc;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.profile-link-button:hover {
  background-color: #0066cc;
  color: white;
}

.title {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333;
}

.stats {
  display: flex;
  gap: 15px;
  color: #666;
}

.stat-item {
  font-size: 0.9em;
}

.close-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.8);
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .video-page {
    flex-direction: column;
  }

  .video-column,
  .metadata-column {
    width: 100%;
  }

  .video-player {
    height: 75vh;
  }

  .metadata-column {
    box-shadow: none;
    padding: 15px;
    height: 25vh;
  }

  .title {
    font-size: 1em;
  }

  .stat-item {
    font-size: 0.8em;
  }
}
</style>
