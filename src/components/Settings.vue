<template>
  <v-menu rounded offset-y nudge-left="60px">
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        elevation="0"
        v-bind="attrs"
        v-on="on"
        style="font-size: 16px"
        icon
      >
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item-group v-model="selectedThemeItem">
        <v-list-item
          v-for="(theme, index) in themes"
          :key="theme.title"
          active-class="primary--text"
          link
          @click="handleTheme(theme.title)"
          :disabled="selectedThemeItem === index"
        >
          <v-list-item-title
            class="text-capitalize"
            v-text="theme.title"
          ></v-list-item-title>
          <v-list-item-icon>
            <v-icon v-text="theme.icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item
          v-if="matchMediaIsSupported"
          active-class="primary--text"
          link
          @click="addSystemThemeListener"
          :disabled="selectedThemeItem === 2"
        >
          <v-list-item-title class="text-capitalize">System</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-desktop-tower-monitor</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit } from 'vue-property-decorator';

// Represents the theme item to display in a list.
interface ThemeListItem {
  // The list item title to represent the theme.
  title: string;

  // The list item icon to represent the theme.
  icon: string;
}

// Dark theme name.
export const DARK = 'dark';
// Light theme name.
export const LIGHT = 'light';

const DARK_BACKGROUND_COLOR = '#121212';
const LIGHT_BACKGROUND_COLOR = '#fff';

@Component({ name: 'settings-btn' })
export default class Settings extends Vue {
  // The themes to display in the settings dropdown
  readonly themes: ThemeListItem[] = [
    { title: LIGHT, icon: 'mdi-white-balance-sunny' },
    { title: DARK, icon: 'mdi-weather-night' }
  ];

  /**
   * The selected theme item on the settings list.
   *
   * 0 = Light
   *
   * 1 = Dark
   *
   * 2 = System
   */
  selectedThemeItem = 0;

  // The MediaQueryList object that will be helpful in changing the theme of the application to match the system
  // theme.
  matchMedia: MediaQueryList | null = null;

  // A computed property that determines if matchMedia is supported in the current browser.
  get matchMediaIsSupported() {
    return Boolean(window.matchMedia);
  }

  /**
   * This function emits the onThemeChange event and returns the name of the theme selected.
   */
  @Emit('themeChange')
  setAndReturnTheme(theme: string) {
    const usingDarkTheme = theme === DARK;
    this.$vuetify.theme.dark = usingDarkTheme;
    // Update the body background color as well for consistency.
    document.body.style.backgroundColor = usingDarkTheme
      ? DARK_BACKGROUND_COLOR
      : LIGHT_BACKGROUND_COLOR;
    return theme;
  }

  // Handles the theme item selected.
  handleTheme(theme: string) {
    this.removeSystemThemeListener();
    this.setAndReturnTheme(theme);
  }

  /**
   * This function is for listening to system theme changes based on a media query event.
   *
   * @param event A MediaQueryListEvent object.
   */
  handleSystemTheme(event: MediaQueryListEvent) {
    const theme = event.matches ? DARK : LIGHT;
    this.setAndReturnTheme(theme);
  }

  // Adds a change listener to automatically update the application's theme based on the system theme.
  addSystemThemeListener() {
    if (this.matchMedia === null) {
      // The MediaQueryList object that helps determine if the system theme is dark mode.
      this.matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
      // Set the theme based on whether or not the media query matched.
      const theme = this.matchMedia.matches ? DARK : LIGHT;
      this.setAndReturnTheme(theme);
      // Add the change listener that will determine application's theme based on the system theme.
      this.matchMedia.addEventListener('change', this.handleSystemTheme, false);
    }
  }

  // Removes the change listener that updates the application's theme based on the system theme.
  removeSystemThemeListener() {
    if (this.matchMedia !== null) {
      this.matchMedia.removeEventListener(
        'change',
        this.handleSystemTheme,
        false
      );
      this.matchMedia = null;
    }
  }
}
</script>
