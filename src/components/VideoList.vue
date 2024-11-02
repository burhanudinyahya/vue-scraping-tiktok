<!-- src/components/VideoList.vue -->
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-[800px] mx-auto">
    <div
      v-for="video in videos"
      :key="video.id"
      class="flex h-auto bg-black"
    >
      <vue-plyr :options="{ controls: ['play', 'progress', 'mute', 'download'] }">
        <video :src="video.url" playsinline class="w-full h-full object-cover"></video>
      </vue-plyr>
    </div>
  </div>
</template>

<script>
import VuePlyr from 'vue-plyr/dist/vue-plyr.esm';
import 'plyr/dist/plyr.css';

export default {
  name: 'VideoList',
  props: ['videos'],
  components: {
    VuePlyr,
  },
};
</script>
