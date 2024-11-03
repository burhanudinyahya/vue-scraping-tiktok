import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import Video from './components/Video.vue';

const routes = [
  { 
    path: '/', 
    component: HomePage 
  },
  { 
    path: '/video/:id',
    name: 'video',
    component: Video
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
