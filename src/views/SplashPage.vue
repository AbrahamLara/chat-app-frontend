<template>
  <div class="splash-view d-flex flex-column-reverse flex-md-row">
    <v-col class="d-lg-flex align-center justify-center" lg="6" md="8">
      <about-view></about-view>
    </v-col>
    <v-col
      class="splash-view_welcome-panel d-flex flex-column align-center justify-center"
      lg="6"
      md="4"
    >
      <v-card
        class="splash-card-thing text-h4 text-lg-h3 pa-3 pt-1 pb-1 pa-lg-5 mr-16"
        tile
        flat
      >
        Welcome
      </v-card>
      <v-card
        class="splash-card-thing text-h4 text-lg-h3 pa-3 pt-1 pb-1 pa-lg-5 mt-4"
        tile
        flat
      >
        to
      </v-card>
      <v-card
        class="splash-card-thing text-h4 text-lg-h3 pa-3 pt-1 pb-1 pa-lg-5 mt-4 ml-16"
        tile
        flat
      >
        ChatApp!
      </v-card>
    </v-col>
  </div>
</template>

<style lang="sass">
@use '../styles/vuetify-vars' as v

.splash-view
  height: 100%

.splash-view_welcome-panel
  background-color: antiquewhite
  background-image: url('../assets/panel-background.jpg')
  background-position: 70% 30%
  background-size: cover

.splash-view_welcome-panel .v-card
  user-select: none

.splash-view .v-card.splash-card-thing
  background: rgba(255,255,255, 0.5)

.splash-view .v-card.theme--dark.splash-card-thing
  background: rgba(30,30,30, 0.5)

//noinspection Stylelint
@media screen and (min-width: map-get(v.$grid-breakpoints, 'lg'))
  .splash-view_welcome-panel
    height: inherit
</style>

<script>
import { getAbout } from '@/utils/dynamic-imports';

export default {
  components: {
    'about-view': getAbout,
  },
};
</script>
