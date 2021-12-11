import { NavigationGuardNext, Route, RouteConfig } from 'vue-router';
import Vue from 'vue';
import {
  getAuthPage,
  getChatPage,
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
    beforeEnter: checkIfUserIsAuthenticated,
  },
  {
    path: '/auth',
    component: getAuthPage,
    beforeEnter: checkIfUserIsAuthenticated,
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
    path: '/chat',
    component: getChatPage,
    beforeEnter: (to, from, next) => {
      if (Vue.$cookies.isKey('token')) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '*',
    name: 'NotFound',
    component: getNotFound,
  },
];

/**
 * Handles rerouting the user back to the chat page if they are authenticated and trying to access the home or
 * login/signup page.
 */
function checkIfUserIsAuthenticated(
  to: Route,
  from: Route,
  next: NavigationGuardNext<Vue>
) {
  // If the token cookie has been set, the user is authenticated and should be redirected to the chat page.
  if (Vue.$cookies.isKey('token')) {
    next('/chat');
  } else {
    next();
  }
}

export { routes };
