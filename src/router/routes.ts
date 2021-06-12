import { RouteConfig } from 'vue-router';
import Vue from 'vue';
import {
  getAuthPage,
  getNotFound,
  getSignIn,
  getSignUp,
  getSplash,
} from '@/utils/dynamic-imports';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Splash',
    component: getSplash,
    // TODO: Add a navigation guard to prevent authenticated users from visiting this route.
  },
  {
    path: '/auth',
    component: getAuthPage,
    beforeEnter: (to, from, next) => {
      // If the token cookie has been set, prevent access to the authentication page.
      if (Vue.$cookies.get('token')) {
        next(false);
      } else {
        next();
      }
    },
    children: [
      {
        path: 'signup',
        component: getSignUp,
      },
      {
        path: 'signin',
        component: getSignIn,
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: getNotFound,
  },
];

export { routes };
