<template>
  <v-app-bar
    :class="{ 'pa-sai': true, white: !usingDarkMode }"
    app
    elevation="1"
    fixed
  >
    <router-link class="text-decoration-none" to="/">
      <div
        :class="{
          'white--text text-h5 d-flex align-center': true,
          'grey--text text--darken-4': !usingDarkMode,
        }"
      >
        ChatApp
      </div>
    </router-link>
    <v-spacer></v-spacer>
    <div class="d-flex align-center">
      <router-link to="#login" class="text-decoration-none">
        <div
          class="auth-btn text--secondary text-center rounded pa-2 pl-2 pr-2"
          v-ripple
        >
          Login
        </div>
      </router-link>
      <router-link to="#signup" class="text-decoration-none">
        <div
          class="auth-btn text--secondary text-center rounded pa-2 pl-2 pr-2"
          v-ripple
        >
          Signup
        </div>
      </router-link>
      <v-divider class="mx-2 my-auto" style="height: 25px" vertical></v-divider>
      <settings-btn></settings-btn>
    </div>
  </v-app-bar>
</template>

<style>
.auth-btn {
  width: 70px;
  user-select: none;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Settings from '@/components/Settings.vue';
import { Component, PropSync } from 'vue-property-decorator';
import { THEME } from '@/utils/theme';

@Component({
  name: 'app-bar',
  components: { 'settings-btn': Settings },
})
export default class AppBar extends Vue {
  // Prop sync is used so that the app bar can handle determining if dark mode is in use by just receiving the theme as
  // it changes.
  @PropSync('theme', String) syncedTheme!: string;

  get usingDarkMode() {
    return this.syncedTheme === THEME.DARK;
  }
}
</script>
