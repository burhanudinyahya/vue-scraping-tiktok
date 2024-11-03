<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-[800px] mx-auto">
    <div
      v-for="video in videos"
      :key="video.id"
      class="flex h-auto bg-black"
    >
      <router-link 
        @click.native="setVideo(video)" 
        :to="{ path: `/video/${video.id}` }">
        <img :src="video.image" alt="Image" class="w-full h-full object-cover" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ImageList',
  props: ['videos'],
  methods: {
    ...mapActions([
      'updateVideoUrlOriginal',
      'updateVideoUrl',
      'updateVideoTitle',
      'updateVideoUsername',
      'updateVideoLikes',
      'updateVideoComments',
    ]),
    setVideo(video) {
      const fullUrl = `http://localhost:8000/video?url=${encodeURIComponent(video.url)}`;
      this.updateVideoUrlOriginal(video.url); 
      this.updateVideoUrl(fullUrl); 
      this.updateVideoTitle(video.title); 
      this.updateVideoUsername(video.username); 
      this.updateVideoLikes(video.likes); 
      this.updateVideoComments(video.comments); 
    }
  },
  // watch: {
  //   videos(newVal) {
  //     console.log("Videos updated:", newVal);
  //   }
  // }
};
</script>
