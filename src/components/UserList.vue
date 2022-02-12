<template>
  <v-list class="user-list pa-0 d-flex flex-column fill-height">
    <v-list-item dense>
      <v-list-item-title v-text="name"></v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    <div v-if="loading" class="d-flex flex align-center justify-center mt-5">
      <v-progress-circular
        size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <template v-else-if="error">
      <div
        class="user-list__error-message mt-3 d-flex justify-center flex-column"
      >
        <v-icon large color="error">mdi-alert-circle-outline</v-icon>
        <div class="text--secondary text-center" v-text="error"></div>
      </div>
    </template>
    <template v-else>
      <div class="user-list__items-container overflow-hidden flex">
        <div class="user-list__items-wrapper fill-height overflow-auto">
          <slot></slot>
        </div>
      </div>
    </template>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, PropSync } from 'vue-property-decorator';

@Component({
  name: 'UserListItem',
})
export default class UserList extends Vue {
  @Prop({ required: true }) name!: string;
  @Prop({ default: false }) loading!: boolean;
  @PropSync('errorMessage', { type: String, default: '' })
  error!: string;
}
</script>

<style lang="sass">
.user-list
  .v-list-item:first-child
    flex: unset

  .user-list-item:last-of-type + .v-divider
    display: none
</style>
