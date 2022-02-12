<template>
  <!--suppress Stylelint -->
  <v-app>
    <app-bar
      :theme="$store.state.theme"
      :authenticated="$store.state.auth.isAuthenticated"
    ></app-bar>
    <v-main style="transition: unset;">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { MutationPayload } from 'vuex';
import { THEME, ThemeHexes } from '@/utils/theme-utils';
import { Action } from '@/utils/decorators';
import { SET_THEME } from '@/store/constants/root-constants';
import { getAppBar } from '@/utils/dynamic-imports';
import { AUTH_NAMESPACE } from '@/store/modules';
import { SET_IS_AUTHENTICATED } from '@/store/constants/auth-constants';

@Component({
  name: 'app',
  components: {
    'app-bar': getAppBar,
  },
})
export default class App extends Vue {
  @Action(SET_IS_AUTHENTICATED, AUTH_NAMESPACE) authenticateUser!: Function;

  unsubscribe!: () => void;

  created() {
    const { theme } = this.$store.state;
    // Set the app theme from store state.
    this.setAppTheme(theme);

    // If a token cookie exists, authenticate the user.
    if (this.$cookies.get('token')) {
      this.authenticateUser(true);
    }

    // Reference the subscriber so that we can unsubscribe from it when the app is destroyed.
    this.unsubscribe = this.$store.subscribe(this.themeListener);
  }

  /**
   * This function will set the application's theme.
   */
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

<style lang="sass">
// Used so content wouldn't flow out of a device's safe area like where a notch would be on landscape mode for devices
// with them.
.pa-sai
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)
</style>
