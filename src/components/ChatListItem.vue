<template>
  <v-list-item
    :class="{
      'chat-list-item': true,
      'primary lighten-4':
        $store.state.theme === 'Light' &&
        $store.state.chats.currentChatID === chatItem.id,
      'accent darken-1':
        $store.state.theme === 'Dark' &&
        $store.state.chats.currentChatID === chatItem.id,
    }"
    @click="handleClick"
    v-ripple
  >
    <v-list-item-avatar size="50" color="accent">
      <v-icon color="secondary">mdi-message-text</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <div class="d-flex justify-space-between">
        <v-list-item-title
          class="font-weight-bold"
          v-text="chatItem.name"
        ></v-list-item-title>
        <span>
          <v-list-item-subtitle
            v-text="twitterTimeAgoLabel(chatItem)"
          ></v-list-item-subtitle>
        </span>
      </div>
      <v-list-item-subtitle>
        <div v-if="userTypingName" class="success--text font-italic">
          {{ `${userTypingName} is typing...` }}
        </div>
        <template v-else>
          <b>{{ `${getAuthorFirstName(chatItem)}:` }}</b>
          {{ chatItem.message.text }}
        </template>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, PropSync } from 'vue-property-decorator';
import { UserChatItem } from '@/utils/chat-utils';
import { getTwitterTimeAgoLabel } from '@/utils/time-utils';
import { Action } from '@/utils/decorators';
import {
  SET_CURRENT_CHAT_ID,
  SET_USER_TYPING,
} from '@/store/constants/chats-constants';
import { CHATS_NAMESPACE, namespaceChats } from '@/store/modules';
import { MutationPayload } from 'vuex';
import { AppState } from '@/store/store-states';
import { UserTypingMessageData } from '@/utils/message-utils';

@Component({
  name: 'ChatListItem',
})
export default class ChatListItem extends Vue {
  @PropSync('chat') chatItem!: UserChatItem;
  @Action(SET_CURRENT_CHAT_ID, CHATS_NAMESPACE) setCurrentChatID!: Function;

  userTypingName = '';

  /**
   * The method to call to unsubscribe from a listener.
   */
  unsubscribe!: Function;

  mounted() {
    this.unsubscribe = this.$store.subscribe(this.setStateListener);
  }

  /**
   * Handles getting alerts set in state and displaying them in the form.
   */
  setStateListener(mutation: MutationPayload, state: AppState) {
    const { payload } = mutation;
    switch (mutation.type) {
      case namespaceChats(SET_USER_TYPING):
        this.handleCurrentUserTyping(payload, state);
        break;
      default:
        break;
    }
  }

  /**
   * Returns the label that conveys how long ago the latest message in the chat was sent.
   *
   * @param chat The user chat object.
   */
  twitterTimeAgoLabel(chat: UserChatItem) {
    const { createdAt } = chat.message;
    return createdAt && getTwitterTimeAgoLabel(createdAt);
  }

  getAuthorFirstName(chat: UserChatItem) {
    return chat.message.author.split(' ')[0];
  }

  /**
   * If the user clicks the chat item, set it as the current chat the user is viewing.
   */
  handleClick() {
    const currentChatID = this.$store.state.chats.currentChatID;

    // Only update the current chat id if the user isn't selecting the same chat.
    if (currentChatID !== this.chatItem.id) {
      this.setCurrentChatID(this.chatItem.id);
    }
  }

  /**
   * Will update the label that shows which user is currently typing in the chat.
   */
  handleCurrentUserTyping(data: UserTypingMessageData, state: AppState) {
    const { chatID } = data;
    const usersTypingList = state.chats?.userTypingMap.get(chatID);

    // Only update the current user who is typing if it's not the current user.
    if (data.chatID === this.chatItem.id) {
      if (usersTypingList?.length) {
        const user = usersTypingList[usersTypingList.length - 1];
        this.userTypingName = user.name;
      } else {
        this.userTypingName = '';
      }
    }
  }
}
</script>

<style lang="sass">
.chat-list-item .v-avatar
  margin-right: 10px
</style>
