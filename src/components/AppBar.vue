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
      <div class="d-flex align-center">
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
        <v-divider
          class="mx-2 my-auto"
          style="height: 25px"
          vertical
        ></v-divider>
      </div>
      <settings-btn></settings-btn>
    </template>
  </v-app-bar>
</template>

<style>
.app-bar__btn {
  width: 80px;
  user-select: none;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Settings from '@/components/Settings.vue';
import { Component, PropSync } from 'vue-property-decorator';
import { THEME } from '@/utils/theme-utils';
import { namespaceAlertsMutation } from '@/store/modules';
import { CLEAR_ALERTS } from '@/store/constants/alerts-constants';
import { Action } from '@/utils/decorators';
import { SET_IS_AUTHENTICATED } from '@/store/constants/root-constants';

@Component({
  name: 'app-bar',
  components: { 'settings-btn': Settings },
})
export default class AppBar extends Vue {
  @Action(SET_IS_AUTHENTICATED) authenticateUser!: Function;
  /**
   * Prop sync is used so that the app bar can handle determining if dark mode is in use by just receiving the theme as
   * it changes.
   */
  @PropSync('theme', { type: String, default: THEME.LIGHT })
  syncedTheme!: string;
  @PropSync('authenticated', { type: Boolean, default: false })
  showLogout!: boolean;

  /**
   * The method to call to unsubscribe from a listener.
   */
  unsubscribe!: Function;

  beforeMount() {
    this.showLogout = Boolean(this.$cookies?.get('token'));
  }

  get isDarkMode() {
    return this.syncedTheme === THEME.DARK;
  }

  /**
   * Clear existing alerts in state.
   */
  clearErrors() {
    this.$store.commit(namespaceAlertsMutation(CLEAR_ALERTS));
  }

  /**
   * Handles the state of the page to log the user out.
   */
  handleLogout() {
    // Get rid of the token cookie.
    this.$cookies.remove('token');

    this.authenticateUser(false);

    // This is to prevent a NavigationDuplicated error if the current page is the home page. This shouldn't be needed
    // once there is a page to navigate the user to that isn't the home page and a navigation guard is added to the
    // home route.
    if (this.$route.path !== '/') {
      this.$router.push('/');
    }
  }
}
</script>
