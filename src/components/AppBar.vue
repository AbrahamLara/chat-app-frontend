<template>
  <v-app-bar :class="{ 'pa-sai': true, white: !isDarkMode }" app flat fixed>
    <router-link class="text-decoration-none" to="/" exact>
      <div
        :class="{
          'white--text text-h5 d-flex align-center': true,
          'grey--text text--darken-4': !isDarkMode,
        }"
      >
        ChatApp
      </div>
    </router-link>
    <v-spacer></v-spacer>
    <div class="d-flex align-center">
      <div
        id="logout-btn"
        v-if="showLogout"
        class="app-bar__btn text-center rounded pa-2 pl-2 pr-2"
        v-ripple
        @click="handleLogout"
      >
        Logout
      </div>
      <template v-else>
        <router-link
          to="/auth/signin"
          :class="{
            'text-decoration-none text--accent': true,
            'text--secondary': $route.path !== '/auth/signin',
          }"
        >
          <div
            id="signin-btn"
            class="app-bar__btn text-center rounded pa-2 pl-2 pr-2"
            @click="clearErrors"
            v-ripple
          >
            Sign In
          </div>
        </router-link>
        <router-link
          to="/auth/signup"
          :class="{
            'text-decoration-none text--accent': true,
            'text--secondary': $route.path !== '/auth/signup',
          }"
        >
          <div
            id="signup-btn"
            class="app-bar__btn text-center rounded pa-2 pl-2 pr-2"
            @click="clearErrors"
            v-ripple
          >
            Sign Up
          </div>
        </router-link>
      </template>
      <v-divider class="mx-2 my-auto" style="height: 25px" vertical></v-divider>
    </div>
    <settings-btn></settings-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, PropSync } from 'vue-property-decorator';
import { THEME } from '@/utils/theme-utils';
import { AUTH_NAMESPACE, namespaceAuth, namespaceChats } from '@/store/modules';
import { CLEAR_ALERTS } from '@/store/constants/alerts-constants';
import { Action } from '@/utils/decorators';
import { getSettings } from '@/utils/dynamic-imports';
import { SET_IS_AUTHENTICATED } from '@/store/constants/auth-constants';

@Component({
  name: 'app-bar',
  components: {
    'settings-btn': getSettings,
  },
})
export default class AppBar extends Vue {
  @Action(SET_IS_AUTHENTICATED, AUTH_NAMESPACE) authenticateUser!: Function;
  /**
   * Prop sync is used so that the app bar can handle determining if dark mode is in use by just receiving the theme as
   * it changes.
   */
  @PropSync('theme', { type: String, default: THEME.LIGHT })
  syncedTheme!: string;
  @PropSync('authenticated', { type: Boolean, default: false })
  showLogout!: boolean;

  /**
   * Determines if app-bar is flat, meaning it has no elevation.
   */
  isFlat = true;

  /**
   * The method to call to unsubscribe from a listener.
   */
  unsubscribe!: Function;

  get isDarkMode() {
    return this.syncedTheme === THEME.DARK;
  }

  /**
   * Clear existing alerts in state.
   */
  clearErrors() {
    this.$store.commit(namespaceAuth(CLEAR_ALERTS));
  }

  /**
   * Handles the state of the page to log the user out.
   */
  handleLogout() {
    // Get rid of the token cookie.
    this.$cookies.remove('token');

    this.authenticateUser(false);

    // Clear chat page errors.
    this.$store.commit(namespaceChats(CLEAR_ALERTS));

    // This is to prevent a NavigationDuplicated error if the current page is the home page. This shouldn't be needed
    // once there is a page to navigate the user to that isn't the home page and a navigation guard is added to the
    // home route.
    if (this.$route.path !== '/') {
      this.$router.push('/');
    }
  }
}
</script>

<style>
.app-bar__btn {
  user-select: none;
  width: 80px;
}
</style>
