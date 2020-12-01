<template>
  <v-app-bar
    :class="{ white: usingLightMode, 'pa-sai': true }"
    app
    elevation="1"
    fixed
  >
    <router-link class="grey--text text--darken-4 text-decoration-none" to="/">
      <div class="text-h5 d-flex align-center">ChatApp</div>
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
      <settings-btn @themeChange="handleThemeChange"></settings-btn>
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
import Settings, { LIGHT } from '@/components/Settings.vue';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'app-bar',
  components: { 'settings-btn': Settings }
})
export default class AppBar extends Vue {
  // We use the "white" class name for the app-bar's background color because using the 'color' prop will not allow
  // us to take advantage of the app-bar's dark mode when enabled.
  usingLightMode = true;

  // Handles the theme changes for the app in order to update the background color of the app-bar as necessary.
  handleThemeChange(theme: string) {
    this.usingLightMode = theme === LIGHT;
  }
}
</script>
