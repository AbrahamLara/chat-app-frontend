import { MutationTree } from 'vuex';
import { MessagesState } from '@/store/store-states';
import { MessageItem } from '@/utils/message-utils';
import alertsMutations from '@/store/mutations/alerts-mutations';
import {
  ADD_MESSAGE,
  EMIT_CHAT_UPDATE,
  SET_MESSAGES_LIST,
} from '@/store/constants/message-constants';

const messagesMutations: MutationTree<MessagesState> = {
  [SET_MESSAGES_LIST]: (
    state: MessagesState,
    payload: { chatID: string; messages: MessageItem[] }
  ) => {
    state.map.set(payload.chatID, payload.messages);
  },
  [ADD_MESSAGE]: (
    state: MessagesState,
    payload: { chatID: string; message: MessageItem }
  ) => {
    const { chatID, message } = payload;
    const messages = state.map.get(chatID);

    if (messages) {
      state.map.set(chatID, messages.concat(message));
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  [EMIT_CHAT_UPDATE]: () => {},
  ...alertsMutations,
};

export default messagesMutations;
