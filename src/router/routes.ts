import { RouteConfig } from 'vue-router';
import Splash from '@/views/Splash.vue';
import AuthPage from '@/views/AuthPage.vue';
import Vue from 'vue';
import SignUp from '@/components/SignUp.vue';
import SignIn from '@/components/SignIn.vue';
import NotFound from '@/views/NotFound.vue';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Splash',
    component: Splash,
    // TODO: Add a navigation guard to prevent authenticated users from visiting this route.
  },
  {
    path: '/auth',
    component: AuthPage,
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

export { routes };
