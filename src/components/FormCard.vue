<template>
  <v-card
    class="form-card pa-sai mt-0 mt-md-8 ml-md-8"
    elevation="0"
    tile
    outlined
  >
    <slot></slot>
  </v-card>
</template>

<style scoped lang="sass">
@import '~vuetify/src/components/VStepper/_variables.scss'

.form-card
  @media screen and (min-width: map-get($grid-breakpoints, 'md'))
    width: 400px
</style>

<script>
export default {
  name: 'FormCard',
};
</script>
