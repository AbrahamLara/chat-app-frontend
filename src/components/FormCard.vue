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
@use '../styles/vuetify-vars' as v

//noinspection Stylelint
@media screen and (min-width: map-get(v.$grid-breakpoints, 'md'))
  .form-card
    width: 400px
</style>

<script>
export default {
  name: 'FormCard',
};
</script>
