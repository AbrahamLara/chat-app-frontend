import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Splash from '../views/Splash.vue';
import SignUp from '../components/SignUp.vue';
import NotFound from '../views/NotFound.vue';
import AuthPage from '../views/AuthPage.vue';
import SignIn from '@/components/SignIn.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Splash',
    component: Splash,
  },
  {
    path: '/auth',
    component: AuthPage,
    children: [
      {
        path: 'signup',
        component: SignUp,
      },
      {
        path: 'signin',
        component: SignIn,
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
