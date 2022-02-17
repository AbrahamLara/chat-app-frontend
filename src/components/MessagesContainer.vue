<template>
  <div
    :class="{
      'messages-container': true,
      'text-center secondary': !messages.length,
      accent: messages.length,
    }"
  >
    <div
      :class="{
        'messages-container__empty-container grey--text text--lighten-2 text-h4': !messages.length,
        'messages-container__with-messages flex overflow-auto pb-4':
          messages.length,
      }"
    >
      <div v-if="messages.length === 0">Messages</div>
      <template v-else>
        <div v-if="errorMessageFetchingMessages">
          <v-icon>mdi-alert</v-icon>
          <div>{{ errorMessageFetchingMessages }}</div>
        </div>
        <div
          v-for="message in messages"
          :key="`message-${message.id}`"
          :id="`message-${message.id}`"
          class="messages-container__message-cell"
        >
          <div
            :class="{
              'messages-container__message pa-2': true,
              'ml-auto white grey--text text--darken-4':
                $store.state.auth.user.id === message.author.id,
              'secondary white--text':
                $store.state.auth.user.id !== message.author.id,
            }"
          >
            <div class="messages-container__message-header d-flex">
              <div
                class="messages-container__author-name flex text-subtitle-1 font-weight-bold"
              >
                {{ message.author.name }}
              </div>
              <div
                class="messages-container__timestamp text-caption font-italic ml-2 align-self-center"
              >
                {{ twitterTimeAgoLabel(message) }}
              </div>
            </div>
            <div class="messages-container__message-text text-body-1">
              {{ message.text }}
            </div>
          </div>
        </div>
      </template>
    </div>
    <div
      v-if="messages.length"
      class="messages-container__input-container d-flex"
    >
      <v-text-field
        v-model="message"
        class="messages-container__input flex"
        placeholder="Message..."
        hide-details
        solo
        flat
        @input="handleChange"
      ></v-text-field>
      <v-btn
        color="primary"
        elevation="0"
        :rounded="false"
        :disabled="!message"
        style="height: 100%; border-radius: 0"
        fab
        @click="handleClick"
      >
        <v-icon large>mdi-send-circle</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import VueAuthHelper from '@/component-utils/VueAuthHelper';
import { MutationPayload } from 'vuex';
import {
  CHATS_NAMESPACE,
  MESSAGES_NAMESPACE,
  namespaceChats,
  namespaceMessages,
} from '@/store/modules';
import { SET_CURRENT_CHAT_ID } from '@/store/constants/chats-constants';
import { AppState } from '@/store/store-states';
import { Action } from '@/utils/decorators';
import {
  ADD_MESSAGE,
  EMIT_CHAT_UPDATE,
  GET_MESSAGES_LIST,
  SEND_MESSAGE,
  SET_MESSAGES_LIST,
} from '@/store/constants/message-constants';
import {
  FAILED_TO_FETCH_MESSAGES_ERROR,
  MessageItem,
  UserTypingMessageData,
} from '@/utils/message-utils';
import { ADD_ERROR } from '@/store/constants/alerts-constants';
import { getTwitterTimeAgoLabel } from '@/utils/time-utils';

@Component({
  name: 'MessagesContainer',
})
export default class MessagesContainer extends VueAuthHelper {
  @Action(GET_MESSAGES_LIST, MESSAGES_NAMESPACE) getMessages!: Function;
  @Action(SEND_MESSAGE, MESSAGES_NAMESPACE) sendMessage!: Function;

  /**
   * The message to send to the chat;
   */
  message = '';

  /**
   * The list of chat messages.
   */
  messages: MessageItem[] = [];

  /**
   * The error message for failing to fetch chat messages.
   */
  errorMessageFetchingMessages = '';

  /**
   * Determines if the user is typing.
   */
  isTyping = false;

  /**
   * The method to call to unsubscribe from a listener.
   */
  unsubscribe!: Function;

  mounted() {
    this.unsubscribe = this.$store.subscribe(this.setStateListener);
  }

  updated() {
    // Once the messages, or new message, have been rendered. Handle scrolling that message into view so that it's the
    // first message the user sees.
    this.$nextTick(() => {
      const messagesLength = this.messages.length;

      // Make sure there are messaged to scroll into view.
      if (messagesLength) {
        // Get the latest message from the list.
        const latestMessage = this.messages[messagesLength - 1];
        const latestMessageElement = document.querySelector(
          `#message-${latestMessage.id}`
        );

        // Make sure the element exists.
        if (latestMessageElement) {
          latestMessageElement.scrollIntoView();
        }
      }
    });
  }

  beforeDestroy() {
    this.unsubscribe();
  }

  /**
   * Handles getting alerts set in state and displaying them in the form.
   */
  setStateListener(mutation: MutationPayload, state: AppState) {
    const { payload } = mutation;
    switch (mutation.type) {
      case namespaceChats(SET_CURRENT_CHAT_ID):
        this.handleChatMessages(payload, state);
        break;
      case namespaceMessages(SET_MESSAGES_LIST):
        this.messages = payload.messages;
        this.errorMessageFetchingMessages = '';
        break;
      case namespaceMessages(ADD_MESSAGE):
        if (payload.chatID === state.chats?.currentChatID) {
          this.messages = this.messages.concat(mutation.payload.message);
        }
        break;
      case namespaceMessages(ADD_ERROR):
        if (payload.message === FAILED_TO_FETCH_MESSAGES_ERROR) {
          this.errorMessageFetchingMessages = FAILED_TO_FETCH_MESSAGES_ERROR;
        }
        break;
      default:
        break;
    }
  }

  /**
   * Handles fetching chat messages. If the messages weren't previously fetched and available, we make an api call and
   * next time we use the already fetched chat.
   */
  handleChatMessages(chatID: string, state: AppState) {
    const messagesMap = state.messages?.map;
    const messages = messagesMap?.get(chatID) as MessageItem[];

    if (!messages) {
      this.getMessages(chatID);
    } else {
      this.messages = messages;
    }
  }

  /**
   * Returns the label that conveys how long ago the message in the chat was sent.
   *
   * @param message The user chat object.
   */
  twitterTimeAgoLabel(message: MessageItem) {
    return message.createdAt && getTwitterTimeAgoLabel(message.createdAt);
  }

  /**
   * This handled calling emitting a chat update event to let other users know the user is typing.
   */
  handleChange() {
    const hasStartedTyping = this.message && !this.isTyping;
    const hasStoppedTyping = !this.message && this.isTyping;

    if (hasStartedTyping) {
      const payload = this.getUserTypingMessageData(true);

      this.isTyping = true;
      this.$store.commit(namespaceMessages(EMIT_CHAT_UPDATE), payload);
    } else if (hasStoppedTyping) {
      const payload = this.getUserTypingMessageData(false);

      this.isTyping = false;
      this.$store.commit(namespaceMessages(EMIT_CHAT_UPDATE), payload);
    }
  }

  /**
   * Returns a data object to send to other user's in the chat letting them know a user is typing via web socket.
   *
   * @param isTyping Determines if the user is typing.
   */
  getUserTypingMessageData(isTyping: boolean): UserTypingMessageData {
    const { chats, auth } = this.$store.state;
    const { id, name } = auth.user;

    return {
      chatID: chats.currentChatID,
      user: { id, name },
      isTyping,
    };
  }

  /**
   * Handles sending the message to the group chat.
   */
  handleClick() {
    const { currentChatID } = this.$store.state.chats;

    this.sendMessage({ chatID: currentChatID, message: this.message });

    this.message = '';
  }
}
</script>

<style lang="sass">
.messages-container
  height: 100%
  display: flex
  flex-direction: column
  overflow: hidden

  & > .messages-container__empty-container
    height: fit-content
    margin-top: auto
    margin-bottom: auto

  & > .messages-container__with-messages
    & > .messages-container__message-cell
      padding: 20px 20px 0

      & > .messages-container__message
        max-width: 300px
        width: fit-content
        border-radius: 10px

  & > .messages-container__input-container > .v-text-field > .v-input__control
    border-radius: 0
</style>
