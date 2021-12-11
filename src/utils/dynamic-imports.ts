// This file contains dynamic imports of components to reduce bundle size when building project with webpack.

// Components
const getAbout = () =>
  import(/* webpackChunkName: "About" */ '@/components/About.vue');

const getAppBar = () =>
  import(/* webpackChunkName: "AppBar" */ '@/components/AppBar.vue');

const getFormCard = () =>
  import(/* webpackChunkName: "FormCard" */ '@/components/FormCard.vue');

const getRegexRulesTester = () =>
  import(
    /* webpackChunkName: "RegexRulesTester" */ '@/components/RegexRulesTester.vue'
  );

const getSettings = () =>
  import(/* webpackChunkName: "Settings" */ '@/components/Settings.vue');

const getSignIn = () =>
  import(/* webpackChunkName: "SignIn" */ '@/components/SignIn.vue');

const getSignUp = () =>
  import(/* webpackChunkName: "SignUp" */ '@/components/SignUp.vue');

// Pages
const getAuthPage = () =>
  import(/* webpackChunkName: "AuthPage"  */ '@/views/AuthPage.vue');

const getNotFound = () =>
  import(/* webpackChunkName: "NotFoundPage" */ '@/views/NotFoundPage.vue');

const getSplash = () =>
  import(/* webpackChunkName: "SplashPage" */ '@/views/SplashPage.vue');

const getChatPage = () =>
  import(/* webpackChunkName: "ChatPage" */ '@/views/ChatPage.vue');

export {
  getAbout,
  getAppBar,
  getAuthPage,
  getFormCard,
  getNotFound,
  getRegexRulesTester,
  getSettings,
  getSignIn,
  getSignUp,
  getSplash,
  getChatPage,
};
