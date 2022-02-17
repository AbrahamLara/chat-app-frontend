import { ActionTree } from 'vuex';
import { AppState, MessagesState } from '@/store/store-states';
import {
  ADD_MESSAGE,
  EMIT_CHAT_UPDATE,
  GET_MESSAGES_LIST,
  SEND_MESSAGE,
  SET_MESSAGES_LIST,
} from '@/store/constants/message-constants';
import { getMessages, sendMessage } from '@/api/message-api';
import alertsActions from '@/store/actions/alerts-actions';
import { ADD_ERROR } from '@/store/constants/alerts-constants';
import { createAlertMessage } from '@/utils/alerts-utils';
import {
  FAILED_TO_FETCH_MESSAGES_ERROR,
  FAILED_TO_SEND_MESSAGE_ERROR,
} from '@/utils/message-utils';

const messagesActions: ActionTree<MessagesState, AppState> = {
  [GET_MESSAGES_LIST]: async ({ commit }, chatID: string) => {
    try {
      const response = await getMessages(chatID);
      const data = await response.json();

      if (response.ok) {
        commit(SET_MESSAGES_LIST, {
          chatID,
          messages: data.messages,
        });
      } else {
        commit(ADD_ERROR, data);
      }
    } catch {
      commit(ADD_ERROR, createAlertMessage(FAILED_TO_FETCH_MESSAGES_ERROR));
    }
  },
  [SEND_MESSAGE]: async (
    { commit },
    payload: { message: string; chatID: string }
  ) => {
    try {
      const { chatID, message } = payload;
      const response = await sendMessage(chatID, message);
      const data = await response.json();
      const messagePayload = { chatID, message: data.message };

      if (response.ok) {
        commit(EMIT_CHAT_UPDATE, messagePayload);
        commit(ADD_MESSAGE, messagePayload);
      } else {
        commit(ADD_ERROR, data);
      }
    } catch {
      commit(ADD_ERROR, createAlertMessage(FAILED_TO_SEND_MESSAGE_ERROR));
    }
  },
  ...alertsActions,
};

export default messagesActions;
