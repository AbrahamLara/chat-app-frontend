import { MutationTree } from 'vuex';
import { ChatsState } from '@/store/store-states';
import {
  EMIT_CHAT_CREATED,
  SET_CHAT,
  SET_CHATS_LIST,
  SET_CURRENT_CHAT_ID,
  SET_USER_TYPING,
} from '@/store/constants/chats-constants';
import { UserChatItem } from '@/utils/chat-utils';
import alertsMutations from '@/store/mutations/alerts-mutations';
import { UserTypingMessageData } from '@/utils/message-utils';

const chatsMutations: MutationTree<ChatsState> = {
  [SET_CHATS_LIST]: (state: ChatsState, chats: UserChatItem[]) => {
    state.chats = chats;
  },
  [SET_CHAT]: (state: ChatsState, chatItem: UserChatItem) => {
    state.chats = [chatItem, ...state.chats];
  },
  [SET_USER_TYPING]: (
    state: ChatsState,
    userTypingMessageData: UserTypingMessageData
  ) => {
    const { chatID, user, isTyping } = userTypingMessageData;
    const { userTypingMap } = state;

    // If the user typing list does not exist in the map, set it.
    if (!userTypingMap.has(chatID)) {
      userTypingMap.set(chatID, []);
    }

    // Get the current list of users typing.
    const currentList = userTypingMap.get(chatID);

    if (currentList) {
      let newList = null;

      // Determine if we have to add or remove a user from the typing state.
      if (isTyping) {
        newList = currentList.concat(user);
      } else {
        newList = currentList.filter(userTyping => userTyping.id !== user.id);
      }
      userTypingMap.set(chatID, newList);
    }
  },
  [SET_CURRENT_CHAT_ID]: (state: ChatsState, chatID: string) => {
    state.currentChatID = chatID;
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  [EMIT_CHAT_CREATED]: () => {},
  ...alertsMutations,
};

export default chatsMutations;
