<template>
  <div class="splash-view d-flex flex-column-reverse flex-md-row">
    <div class="d-lg-flex align-center justify-center col-md-8 col-lg-6">
      <about-view></about-view>
    </div>
    <div
      class="splash-view_welcome-panel d-flex flex-column align-center justify-center col-md-4 col-lg-6"
    >
      <v-card class="text-h4 text-lg-h1 pa-3 pt-1 pb-1 pa-lg-5 mr-16" tile flat>
        Welcome
      </v-card>
      <v-card class="text-h4 text-lg-h1 pa-3 pt-1 pb-1 pa-lg-5 mt-4" tile flat>
        to
      </v-card>
      <v-card
        class="text-h4 text-lg-h1 pa-3 pt-1 pb-1 pa-lg-5 mt-4 ml-16"
        tile
        flat
      >
        ChatApp!
      </v-card>
    </div>
  </div>
</template>

<style lang="sass">
@import '~vuetify/src/components/VStepper/_variables.scss'

.splash-view
  height: 100%

.splash-view_welcome-panel
  background-color: antiquewhite
  background-image: url('../assets/panel-background.jpg')
  background-position: 70% 30%
  background-size: cover

.splash-view_welcome-panel .v-card
  user-select: none

.splash-view_welcome-panel
  @media screen and (min-width: map-get($grid-breakpoints, 'lg'))
    height: inherit
</style>

<script>
import About from '@/components/About.vue';

export default {
  components: {
    'about-view': About,
  },
};
</script>
