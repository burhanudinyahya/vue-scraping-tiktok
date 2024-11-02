<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-[800px] mx-auto">
    <div
      v-for="video in videos"
      :key="video.id"
      class="flex h-auto bg-black"
    >
      <a :href="video.url" target="_blank" rel="noopener noreferrer">
        <img :src="video.src" alt="Image" class="w-full h-full object-cover" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageList',
  props: ['videos'],
  watch: {
    videos(newVal) {
      console.log("Videos updated:", newVal);
    }
  }
};
</script>
