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
            <v-card-title class="chat-page__search-container pa-3">
              <v-text-field
                label="Search"
                prepend-inner-icon="mdi-magnify"
                outlined
                dense
                hide-details
                @keyup="handleUserSearch"
                autocomplete="off"
              ></v-text-field>
            </v-card-title>
            <!--suppress Stylelint -->
            <div style="flex: 1; overflow: hidden;">
              <user-list
                name="Results"
                :loading="isListLoading"
                :error-message="searchErrorMessage"
              >
                <div v-if="!users.length">
                  <div
                    class="text--secondary text-center mt-3"
                    v-text="'No results to display'"
                  ></div>
                </div>
                <template v-for="(user, index) in users">
                  <user-list-item
                    :key="index"
                    :user="user"
                    @click="handleUserItemClick"
                  ></user-list-item>
                  <v-divider :key="`divider-${index}`"></v-divider>
                </template>
              </user-list>
            </div>
          </v-card>
        </div>
      </v-col>
      <v-col class="pa-0 fill-height" sm="9">
        <div class="ChatPage__empty-container secondary">
          <div
            class="ChatPage__empty-container-message grey--text text--lighten-2 text-h4"
          >
            <div>Messages</div>
            <div>container</div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import UserListItem from '@/components/UserListItem.vue';
import { UserItem } from '@/utils/misc-utils';
import UserList from '@/components/UserList.vue';
import tempStyles from '@/styles/ChatPageTempStyles.temp.sass';
import { isInvalidTokenMessage } from '@/utils/auth-utils';
import VueAuthHelper from '@/component-utils/VueAuthHelper';
import { Action } from '@/utils/decorators';
import { SET_ERRORS } from '@/store/constants/alerts-constants';
import { ALERTS_NAMESPACE } from '@/store/modules';
import { searchUser } from '@/api/search-api';

@Component({
  name: 'ChatPage',
  components: {
    'user-list': UserList,
    'user-list-item': UserListItem,
  },
})
export default class ChatPage extends VueAuthHelper {
  @Action(SET_ERRORS, ALERTS_NAMESPACE) setErrors!: Function;
  users: UserItem[] = [];

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
   * Apply temporary styles that modify the application for this specific page.
   */
  beforeMount() {
    tempStyles.use();
  }

  /**
   * Remove temporary styles so that they don't remain set since they are only meant to be applied for this page.
   */
  beforeDestroy() {
    tempStyles.unuse();
  }

  /**
   * Handles a user item being clicked.
   */
  handleUserItemClick(user: UserItem) {
    console.log(user.name);
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
    } else if (this.users.length) {
      this.users = [];
    }

    // Display the loading spinner in the user list while a search is being performed.
    this.isListLoading = false;
  }

  /**
   * Handles making the search api call for users using the provided value.
   */
  async userSearch(value: string) {
    try {
      const response = await searchUser(value);
      const data = await response.json();

      if (response.ok) {
        this.users = data.results;
      } else if (isInvalidTokenMessage(data)) {
        this.unAuthenticateUser();
      } else {
        this.users = [];
      }
    } catch (event) {
      this.searchErrorMessage = 'An error occurred performing a search.';
    }

    // Set the loading flag to false to remove the spinner.
    this.isListLoading = false;
  }
}
</script>

<style lang="sass">
@use '../styles/vuetify-vars' as v

.ChatPage__empty-container
  display: flex
  justify-content: center
  align-content: center
  height: 100%
  text-align: center

  .ChatPage__empty-container-message
    height: fit-content
    margin-top: auto
    margin-bottom: auto

//noinspection Stylelint
@media screen and (max-width: map-get(v.$grid-breakpoints, 'sm'))
  .chat-page
    .col.col--hidden
      display: none
</style>
