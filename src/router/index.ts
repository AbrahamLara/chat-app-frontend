import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Splash from '../views/Splash.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Splash',
    component: Splash
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
