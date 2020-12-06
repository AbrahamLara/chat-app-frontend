<template>
  <v-menu v-model="showMenu" rounded offset-y nudge-left="60px">
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
import { Component } from 'vue-property-decorator';
import { THEME } from '@/utils/theme';
import { Action } from '@/utils/decorators';
import { ActionMethod } from 'vuex';
import { SET_THEME } from '@/store/actions';

// Represents the theme item to display in a list.
interface ThemeListItem {
  // The list item title to represent the theme.
  title: THEME;

  // The list item icon to represent the theme.
  icon: string;
}

@Component({ name: 'settings-btn' })
export default class Settings extends Vue {
  @Action(SET_THEME) updateAppTheme!: ActionMethod;
  // The themes to display in the settings dropdown
  readonly themes: ThemeListItem[] = [
    { title: THEME.LIGHT, icon: 'mdi-white-balance-sunny' },
    { title: THEME.DARK, icon: 'mdi-weather-night' }
  ];
  // This variable solely exists for testing purposes.
  showMenu = false;

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

  // Handles the theme item selected.
  handleTheme(theme: THEME) {
    this.removeSystemThemeListener();
    this.updateAppTheme(theme);
  }

  /**
   * This function is for listening to system theme changes based on a media query event.
   *
   * @param event A MediaQueryListEvent object.
   */
  handleSystemTheme(event: MediaQueryListEvent) {
    const theme = event.matches ? THEME.DARK : THEME.LIGHT;
    this.updateAppTheme(theme);
  }

  // Adds a change listener to automatically update the application's theme based on the system theme.
  addSystemThemeListener() {
    if (this.matchMedia === null) {
      // The MediaQueryList object that helps determine if the system theme is dark mode.
      this.matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
      // Set the theme based on whether or not the media query matched.
      const theme = this.matchMedia.matches ? THEME.DARK : THEME.LIGHT;
      this.updateAppTheme(theme);
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
