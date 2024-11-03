import { createStore } from 'vuex';

export default createStore({
  state: {
    videoUrlOriginal: '', 
    videoUrl: '', 
    videoTitle: '', 
    videoUsername: '',
    videoLikes: '',
    videoComments: '',
  },
  mutations: {
    setVideoUrlOriginal(state, urlOriginal) {
      state.videoUrlOriginal = urlOriginal; 
    },
    setVideoUrl(state, url) {
      state.videoUrl = url; 
    },
    setVideoTitle(state, title) {
      state.videoTitle = title; 
    },
    setVideoUsername(state, username) {
      state.videoUsername = username; 
    },
    setVideoLikes(state, likes) {
      state.videoLikes = likes; 
    },
    setVideoComments(state, comments) {
      state.videoComments = comments; 
    }
  },
  actions: {
    updateVideoUrlOriginal({ commit }, urlOriginal) {
      commit('setVideoUrlOriginal', urlOriginal); 
    },
    updateVideoUrl({ commit }, url) {
      commit('setVideoUrl', url); 
    },
    updateVideoTitle({ commit }, title) {
      commit('setVideoTitle', title); 
    },
    updateVideoUsername({ commit }, username) {
      commit('setVideoUsername', username); 
    },
    updateVideoLikes({ commit }, likes) {
      commit('setVideoLikes', likes); 
    },
    updateVideoComments({ commit }, comments) {
      commit('setVideoComments', comments); 
    }
  }
});
