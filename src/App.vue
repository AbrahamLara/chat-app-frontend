<template>
  <v-app>
    <v-main>
      <app-bar></app-bar>
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
import AppBar from '@/components/AppBar.vue';

export default {
  name: 'app',
  components: {
    'app-bar': AppBar
  }
};
</script>
