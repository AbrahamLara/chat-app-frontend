<template>
  <v-list-item class="user-list-item" v-ripple>
    <v-list-item-avatar size="50" color="#aaa">
      <v-icon>mdi-account</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <div class="d-flex justify-space-between">
        <v-list-item-title v-text="user.name"></v-list-item-title>
        <span v-if="twitterTimeAgoLabel">
          <v-list-item-subtitle
            v-text="twitterTimeAgoLabel"
          ></v-list-item-subtitle>
        </span>
      </div>
      <v-list-item-subtitle
        v-if="user.message"
        v-text="user.message"
      ></v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { toTwitterTimeAgoLabel } from '@/utils/time-utils';
import { UserItem } from '@/utils/misc-utils';

@Component({
  name: 'UserListItem',
})
export default class UserListItem extends Vue {
  @Prop({ required: true }) user!: UserItem;

  /**
   * Converts the provided timestamp to mimic twitter's "time ago" labels.
   */
  get twitterTimeAgoLabel() {
    const { timeStamp } = this.user;
    return timeStamp && toTwitterTimeAgoLabel(timeStamp);
  }
}
</script>

<style lang="sass">
.user-list-item .v-divider:last-of-type
  display: none
</style>
