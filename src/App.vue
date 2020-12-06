<template>
  <v-app>
    <v-main>
      <app-bar :theme="this.$store.state.theme"></app-bar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style>
.pa-sai {
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
}
</style>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/AppBar.vue';
import { Component } from 'vue-property-decorator';
import { MutationPayload } from 'vuex';
import { THEME, ThemeHexes } from '@/utils/theme';
import { SET_THEME } from '@/store/actions';

@Component({
  name: 'app',
  components: {
    'app-bar': AppBar,
  },
})
export default class App extends Vue {
  unsubscribe!: () => void;

  created() {
    const { theme } = this.$store.state;
    // Set the app theme from store state.
    this.setAppTheme(theme);
    // Reference the subscriber so that we can unsubscribe from it when the app is destroyed.
    this.unsubscribe = this.$store.subscribe(this.themeListener);
  }

  // This function will set the application's theme.
  setAppTheme(theme: THEME) {
    // Update vuetify dark theme based on app state.
    this.$vuetify.theme.dark = theme === THEME.DARK;
    // Update the body element's background color as well for consistency.
    document.body.style.backgroundColor = ThemeHexes[theme];
  }

  /**
   * A mutation listener that will update the app theme based on store state.
   *
   * @param mutation The mutation payload which includes the type of mutation triggered and the payload passed.
   */
  themeListener(mutation: MutationPayload) {
    if (mutation.type === SET_THEME) {
      const theme = mutation.payload;
      this.setAppTheme(theme);
    }
  }

  destroyed() {
    this.unsubscribe();
  }
}
</script>
