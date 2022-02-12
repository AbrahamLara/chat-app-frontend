<template>
  <v-list-item class="user-list-item">
    <v-list-item-action>
      <v-checkbox
        @change="handleOnChange"
        :input-value="isSelected"
      ></v-checkbox>
    </v-list-item-action>
    <v-list-item-avatar size="50" color="#aaa">
      <v-icon>mdi-account</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <div class="d-flex justify-space-between">
        <v-list-item-title v-text="user.name"></v-list-item-title>
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { UserItem } from '@/utils/misc-utils';

@Component({
  name: 'UserListItem',
})
export default class UserListItem extends Vue {
  @Prop({ required: true }) user!: UserItem;
  @Prop({ required: true }) isSelected!: boolean;

  @Emit('toggle')
  handleOnChange() {
    return this.user;
  }
}
</script>

<style lang="sass">
.user-list-item .v-divider:last-of-type
  display: none
</style>
