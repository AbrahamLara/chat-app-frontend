<template>
  <div class="splash">
    <v-app-bar :class="appBarClass" app flat>
      <v-spacer></v-spacer>
      <settings-btn @themeChange="handleThemeChange"></settings-btn>
    </v-app-bar>
    <v-divider></v-divider>
    <about-view></about-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import About from '@/components/About.vue';
import Settings, { DARK } from '@/components/Settings.vue';
import { Component } from 'vue-property-decorator';

@Component({ components: { 'about-view': About, 'settings-btn': Settings } })
export default class Splash extends Vue {
  // We use the "white" class name for the app-bar's background color because using the 'color' prop will not allow
  // us to take advantage of the app-bar's dark mode when enabled.
  appBarClass = 'white';

  // Handles the theme changes for the app in order to update the background color of the app-bar as necessary.
  handleThemeChange(theme: string) {
    this.appBarClass = theme === DARK ? '' : 'white';
  }
}
</script>
