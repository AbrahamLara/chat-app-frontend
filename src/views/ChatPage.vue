<template>
  <div class="chat-page d-flex fill-height">
    <v-row no-gutters>
      <v-col class="pa-0 fill-height col--hidden" sm="3">
        <div class="chat-page__sidebar fill-height">
          <v-card
            class="chat-page__sidebar-container fill-height d-flex flex-column"
            tile
            flat
          >
            <v-card-title class="d-flex justify-space-between pa-3 primary">
              <h2 class="font-weight-medium white--text">
                Chats
              </h2>
              <create-dialog></create-dialog>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-0 overflow-auto flex">
              <v-list class="pa-0 d-flex flex-column fill-height">
                <div
                  v-if="isChatsLoading && !chatsErrorMessage"
                  class="d-flex flex align-center justify-center mt-5"
                >
                  <v-progress-circular
                    size="50"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
                </div>
                <template v-else-if="chatsErrorMessage">
                  <div class="mt-3 d-flex justify-center flex-column">
                    <v-icon large color="error">
                      mdi-alert-circle-outline
                    </v-icon>
                    <div
                      class="text--secondary text-center"
                      v-text="chatsErrorMessage"
                    ></div>
                  </div>
                </template>
                <template v-else>
                  <div class="overflow-hidden flex">
                    <div class="fill-height overflow-auto">
                      <div
                        class="pt-4 text--secondary text-body-1 font-weight-bold text-center"
                        v-if="
                          !Boolean(
                            $store.state.chats.chats &&
                              $store.state.chats.chats.length
                          )
                        "
                      >
                        No chats to display!
                      </div>
                      <template
                        v-else
                        v-for="(chat, index) in $store.state.chats.chats"
                      >
                        <chat-list-item
                          :key="`chat-${index}`"
                          :chat="chat"
                        ></chat-list-item>
                        <v-divider :key="`chat-divider-${index}`"></v-divider>
                      </template>
                    </div>
                  </div>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col class="pa-0 fill-height" sm="9">
        <messages-container></messages-container>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import tempStyles from '@/styles/ChatPageTempStyles.temp.sass';
import VueAuthHelper from '@/component-utils/VueAuthHelper';
import CreateChatDialog from '@/components/CreateDialog.vue';
import { MutationPayload } from 'vuex';
import {
  AUTH_NAMESPACE,
  CHATS_NAMESPACE,
  namespaceChats,
} from '@/store/modules';
import { ADD_ERROR } from '@/store/constants/alerts-constants';
import { UserChatItem } from '@/utils/chat-utils';
import { INVALID_TOKEN_MESSAGE } from '@/utils/auth-utils';
import { Action } from '@/utils/decorators';
import { FETCH_CHATS, SET_CHATS_LIST } from '@/store/constants/chats-constants';
import { GET_USER_PROFILE } from '@/store/constants/auth-constants';
import MessagesContainer from '@/components/MessagesContainer.vue';
import ChatListItem from '@/components/ChatListItem.vue';

@Component({
  name: 'ChatPage',
  components: {
    MessagesContainer,
    'create-dialog': CreateChatDialog,
    'messages-container': MessagesContainer,
    'chat-list-item': ChatListItem,
  },
})
export default class ChatPage extends VueAuthHelper {
  @Action(FETCH_CHATS, CHATS_NAMESPACE) fetchChats!: Function;
  @Action(GET_USER_PROFILE, AUTH_NAMESPACE) getUserProfile!: Function;

  /**
   * Determines if the page is still attempting to fetch and load the user's chat  groups.
   */
  isChatsLoading = true;

  /**
   * The error message to display if fetching the chats failed.
   */
  chatsErrorMessage = '';

  /**
   * The method to call to unsubscribe from a listener.
   */
  unsubscribe!: Function;

  /**
   * Apply temporary styles that modify the application for this specific page.
   */
  beforeMount() {
    tempStyles.use();
  }

  mounted() {
    this.fetchChats();
    this.getUserProfile();
    this.unsubscribe = this.$store.subscribe(this.setStateListener);
  }

  /**
   * Remove temporary styles so that they don't remain set since they are only meant to be applied for this page.
   */
  beforeDestroy() {
    tempStyles.unuse();
    this.unsubscribe();
  }

  /**
   * Handles getting alerts set in state and displaying them in the form.
   */
  setStateListener(mutation: MutationPayload) {
    switch (mutation.type) {
      case namespaceChats(ADD_ERROR):
        if (mutation.payload.message === INVALID_TOKEN_MESSAGE) {
          this.unAuthenticateUser();
        } else {
          this.chatsErrorMessage = mutation.payload.message;
        }
        break;
      case namespaceChats(SET_CHATS_LIST):
        this.isChatsLoading = false;
        break;
      default:
        break;
    }
  }
}
</script>

<style lang="sass">
@use '../styles/vuetify-vars' as v

.chat-page .user-chat-item .v-avatar
  margin-right: 10px

//noinspection Stylelint
@media screen and (max-width: map-get(v.$grid-breakpoints, 'sm'))
  .chat-page
    .col.col--hidden
      display: none
</style>
