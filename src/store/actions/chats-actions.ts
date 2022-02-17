import { ActionTree } from 'vuex';
import { AppState, ChatsState } from '@/store/store-states';
import {
  EMIT_CHAT_CREATED,
  CREATE_CHAT,
  FETCH_CHATS,
  SET_CHAT,
  SET_CHATS_LIST,
  SET_CURRENT_CHAT_ID,
} from '@/store/constants/chats-constants';
import {
  CREATE_CHAT_SUCCESS_MESSAGE,
  CreateChatFormFields,
} from '@/utils/chat-utils';
import { createChat, fetchChats } from '@/api/chat-api';
import {
  ADD_ERROR,
  ADD_SUCCESS,
  SET_ERRORS,
} from '@/store/constants/alerts-constants';
import { createAlertMessage, isFormErrorMessage } from '@/utils/alerts-utils';
import alertsActions from '@/store/actions/alerts-actions';

const chatsActions: ActionTree<ChatsState, AppState> = {
  [CREATE_CHAT]: async ({ commit }, createChatForm: CreateChatFormFields) => {
    try {
      const response = await createChat(createChatForm);
      const data = await response.json();

      if (response.ok) {
        commit(EMIT_CHAT_CREATED, {
          chat: data.chat,
          memberIDs: createChatForm.userIDs,
        });
        commit(SET_CHAT, data.chat);
        commit(ADD_SUCCESS, createAlertMessage(CREATE_CHAT_SUCCESS_MESSAGE));
      } else if (isFormErrorMessage(data)) {
        commit(SET_ERRORS, data);
      } else {
        commit(ADD_ERROR, data);
      }
    } catch (event) {
      const alertMessage = createAlertMessage('Failed to create group chat');
      commit(ADD_ERROR, alertMessage);
    }
  },
  [FETCH_CHATS]: async ({ commit }) => {
    try {
      const response = await fetchChats();
      const data = await response.json();

      if (response.ok) {
        commit(SET_CHATS_LIST, data.chats);
      } else {
        commit(ADD_ERROR, data);
      }
    } catch (event) {
      const alertMessage = createAlertMessage(
        'An error occurred fetching group chats'
      );
      commit(ADD_ERROR, alertMessage);
    }
  },
  [SET_CURRENT_CHAT_ID]: async ({ commit }, chatID: string) => {
    commit(SET_CURRENT_CHAT_ID, chatID);
  },
  ...alertsActions,
};

export default chatsActions;
