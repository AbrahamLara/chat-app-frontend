<template>
  <v-app>
    <v-main>
      <v-theme-provider root>
        <router-view></router-view>
      </v-theme-provider>
    </v-main>
  </v-app>
</template>

<style></style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'app'
})
export default class App extends Vue {}
</script>
