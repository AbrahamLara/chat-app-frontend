<template>
  <v-row class="create-dialog">
    <v-dialog
      v-model="isDialogOpen"
      scrollable
      max-width="600px"
      @click:outside="closeDialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          id="create-dialog__create-btn"
          color="secondary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          New Chat
        </v-btn>
      </template>
      <v-card class="create-dialog__card">
        <v-card-title>Create Group Chat</v-card-title>
        <v-divider></v-divider>
        <v-card-subtitle v-if="alertBarOptions.visible">
          <v-alert
            id="alert-banner"
            :type="alertBarOptions.type"
            border="left"
            dense
          >
            {{ alertBarOptions.message }}
          </v-alert>
        </v-card-subtitle>
        <v-card-subtitle class="d-flex">
          <v-text-field
            v-model="createChatForm.chatName"
            class="pr-2"
            label="Chat name"
            hint="The name of your new chat."
            persistent-hint
            outlined
            dense
            autocomplete="off"
            :success="Boolean(createChatForm.chatName)"
            :error-messages="chatErrors.chatName"
            @keydown="chatErrors.chatName && resetCreateChatError('chatName')"
          ></v-text-field>
          <v-text-field
            v-model="createChatForm.message"
            class="pl-2"
            label="Message"
            hint="The first chat message to send."
            persistent-hint
            outlined
            dense
            autocomplete="off"
            :success="Boolean(createChatForm.message)"
            :error-messages="chatErrors.message"
            @keydown="chatErrors.message && resetCreateChatError('message')"
          ></v-text-field>
        </v-card-subtitle>
        <v-card-subtitle class="d-flex align-center pt-0">
          <v-text-field
            v-model="searchValue"
            label="Search for group member"
            prepend-inner-icon="mdi-magnify"
            outlined
            dense
            @keyup="handleUserSearch"
            autocomplete="off"
            :hide-details="!Boolean(chatErrors.userIDs)"
            :success="Boolean(createChatForm.userIDs.length)"
            :error-messages="chatErrors.userIDs"
            @keydown="chatErrors.userIDs && resetCreateChatError('userIDs')"
          ></v-text-field>
          <v-menu
            v-if="Boolean(selectedUsers.length)"
            v-model="isMenuOpen"
            :close-on-content-click="false"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ml-3" color="primary" v-bind="attrs" v-on="on">
                Selected ({{ selectedUsers.length }})
              </v-btn>
            </template>
            <v-card>
              <div
                :key="`user-selected-${index}`"
                v-for="(user, index) in selectedUsers"
                class="d-flex align-center justify-space-between pa-3"
              >
                <span>{{ user.name }}</span>
                <v-btn class="ml-2" small icon @click="deselectUser(user)">
                  <v-icon color="error">mdi-cancel</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-menu>
        </v-card-subtitle>
        <v-card-text style="height: 300px;">
          <!-- This section is for displaying user search results that are selectable. -->
          <div class="create-dialog__list-container overflow-hidden">
            <user-list
              name="Results"
              :loading="isListLoading"
              :error-message="searchErrorMessage"
            >
              <div v-if="!searchResults.length">
                <div
                  class="text--secondary text-center mt-3"
                  v-text="'No results to display'"
                ></div>
              </div>
              <template v-for="(user, index) in searchResults">
                <user-list-item
                  :key="`user-search-${index}`"
                  :user="user"
                  :is-selected="
                    selectedUsers.some(
                      selectedUser => selectedUser.id === user.id
                    )
                  "
                  @toggle="handleUserItemToggle"
                ></user-list-item>
                <v-divider :key="`divider-${index}`"></v-divider>
              </template>
            </user-list>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="createChat(createChatForm)">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import UserList from '@/components/UserList.vue';
import UserListItem from '@/components/UserListItem.vue';
import { searchUsers } from '@/api/search-api';
import { isInvalidTokenMessage } from '@/utils/auth-utils';
import { UserItem } from '@/utils/misc-utils';
import { Action } from '@/utils/decorators';
import {
  ADD_ERROR,
  ADD_SUCCESS,
  SET_ERRORS,
} from '@/store/constants/alerts-constants';
import {
  ALERTS_NAMESPACE,
  CHATS_NAMESPACE,
  namespaceChats,
} from '@/store/modules';
import { CREATE_CHAT } from '@/store/constants/chats-constants';
import {
  CREATE_CHAT_SUCCESS_MESSAGE,
  CreateChatFormFields,
} from '@/utils/chat-utils';
import {
  DEFAULT_ALERT_BAR_OPTIONS,
  FormAlertMessage,
} from '@/utils/alerts-utils';
import { MutationPayload } from 'vuex';
import { AppState } from '@/store/store-states';
import VueAuthHelper from '@/component-utils/VueAuthHelper';

interface CreateChatFieldError {
  /**
   * The error message for the chat name field;
   */
  chatName: string;

  /**
   * The error message for the message field;
   */
  message: string;

  /**
   * The error message for the userIDs field
   */
  userIDs: string;
}

@Component({
  name: 'CreateChatDialog',
  components: {
    'user-list': UserList,
    'user-list-item': UserListItem,
  },
})
export default class CreateChatDialog extends VueAuthHelper {
  @Action(SET_ERRORS, ALERTS_NAMESPACE) setErrors!: Function;
  @Action(CREATE_CHAT, CHATS_NAMESPACE) createChat!: Function;

  /**
   * The user search results fetched.
   */
  searchResults: UserItem[] = [];

  /**
   * The selected user from the search results.
   */
  selectedUsers: UserItem[] = [];

  /**
   * Determines if the dialog is open.
   */
  isDialogOpen = false;

  /**
   * Determines if the menu is open.
   */
  isMenuOpen = false;

  /**
   * Indicates if the user list should display a spinner to convey a search being performed.
   */
  isListLoading = false;

  /**
   * The setTimeout id that will perform a search. The id is used to clear the setTimeout on every keyup event until
   * to prevent performing a search until the user stops typing.
   */
  timeoutID: ReturnType<typeof setTimeout> | null = null;

  /**
   * The error message to display when an error occurs performing a search.
   */
  searchErrorMessage = '';

  /**
   * The value the user types in the search bar.
   */
  searchValue = '';

  /**
   * Form values for creating a chat.
   */
  createChatForm: CreateChatFormFields = {
    chatName: '',
    message: '',
    userIDs: [],
  };

  chatErrors = {
    chatName: '',
    message: '',
    userIDs: '',
  };

  alertBarOptions = { ...DEFAULT_ALERT_BAR_OPTIONS };

  /**
   * The method to call to unsubscribe from a listener.
   */
  unsubscribe!: Function;

  mounted() {
    this.unsubscribe = this.$store.subscribe(this.setStateListener);
  }

  beforeDestroy() {
    this.unsubscribe();
  }

  /**
   * Handles getting alerts set in state and displaying them in the form.
   */
  setStateListener(mutation: MutationPayload, state: AppState) {
    switch (mutation.type) {
      case namespaceChats(ADD_ERROR):
      case namespaceChats(SET_ERRORS):
        if (state.chats) {
          state.chats.alerts.errors.forEach(
            ({ field, message }: FormAlertMessage) => {
              if (field) {
                this.chatErrors[field as keyof CreateChatFieldError] = message;
              } else {
                this.alertBarOptions = {
                  visible: true,
                  type: 'error',
                  message,
                };
              }
            }
          );
        }
        break;
      case namespaceChats(ADD_SUCCESS):
        if (mutation.payload.message === CREATE_CHAT_SUCCESS_MESSAGE) {
          this.isDialogOpen = false;
          this.resetFormValues();
        }
        break;
      default:
        break;
    }
  }

  /**
   * Handles a user item being clicked.
   */
  handleUserItemToggle(userItem: UserItem, checked: boolean) {
    // Close the popover menu if it's still open.
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }

    // Determines whether the toggled user search item should be in the selected state.
    if (checked) {
      this.selectedUsers = this.selectedUsers.concat(userItem);
      this.createChatForm.userIDs = this.createChatForm.userIDs.concat(
        userItem.id
      );
    } else {
      this.deselectUser(userItem);
    }
  }

  /**
   * This function handles user search and allows the user to make a user search by simply typing out a name and not
   * having to hit "Enter". This function utilizes the debouncing technique to prevent multiple api calls on every
   * keystroke in the search input.
   */
  handleUserSearch(event: any) {
    const search = event.target.value;

    if (!this.isListLoading) {
      this.isListLoading = true;
    }

    // Clear the error message displayed.
    if (this.searchErrorMessage) {
      this.searchErrorMessage = '';
    }

    // Clear the timeout function with the given id.
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }

    // If the search input is a non-empty string, perform a user search. Otherwise, clear the search results if there
    // are any left.
    if (search) {
      this.timeoutID = setTimeout(() => {
        this.userSearch(search);
      }, 600);
      return;
    } else if (this.searchResults.length) {
      this.searchResults = [];
    }

    // Display the loading spinner in the user list while a search is being performed.
    this.isListLoading = false;
  }

  /**
   * Handles making the search api call for users using the provided value.
   */
  async userSearch(value: string) {
    try {
      const response = await searchUsers(value);
      const data = await response.json();

      if (response.ok) {
        this.searchResults = data.results;
      } else if (isInvalidTokenMessage(data)) {
        this.unAuthenticateUser();
      } else {
        this.searchResults = [];
      }
    } catch {
      this.searchErrorMessage = 'An error occurred performing a search.';
    }

    // Set the loading flag to false in order to remove the spinner.
    this.isListLoading = false;
  }

  /**
   * Uses the provided user item to remove the user from the selected list based on their id.
   */
  deselectUser(userItem: UserItem) {
    this.selectedUsers = this.selectedUsers.filter(
      selectedUser => selectedUser.id !== userItem.id
    );
    this.createChatForm.userIDs = this.createChatForm.userIDs.filter(
      id => id !== userItem.id
    );
  }

  /**
   * Resets chat form error message.
   */
  resetCreateChatError(type: keyof CreateChatFieldError) {
    this.chatErrors[type] = '';
  }

  /**
   * Resets the form values that were provided by the user filling out the form.
   */
  resetFormValues() {
    this.selectedUsers = [];
    this.createChatForm = {
      chatName: '',
      message: '',
      userIDs: [],
    };
    this.chatErrors = {
      chatName: '',
      message: '',
      userIDs: '',
    };
    this.searchValue = '';
    // Close the menu if it's still open.
    this.isMenuOpen = false;
  }

  /**
   * Handles resetting the dialog and closing it.
   */
  closeDialog() {
    this.isDialogOpen = false;
    this.resetFormValues();
  }
}
</script>

<style lang="sass">
.row.create-dialog
  margin: 0
  flex: unset

.v-dialog .v-card.create-dialog__card
  & .v-card__subtitle
    padding-top: 20px
    padding-bottom: 0

  & .v-card__text
    padding-bottom: 0

  & .create-dialog__list-container
    height: 100%
    & .user-list-item .v-avatar
      margin-right: 10px
</style>
