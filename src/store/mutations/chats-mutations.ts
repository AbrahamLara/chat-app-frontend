import { MutationTree } from 'vuex';
import { ChatsState } from '@/store/store-states';
import { ADD_CHAT, SET_CHATS_LIST } from '@/store/constants/chats-constants';
import { UserChatItem } from '@/utils/chat-utils';
import alertsMutations from '@/store/mutations/alerts-mutations';

const chatsMutations: MutationTree<ChatsState> = {
  [SET_CHATS_LIST]: (state: ChatsState, chats: UserChatItem[]) => {
    state.chats = chats;
  },
  [ADD_CHAT]: (state: ChatsState, chatItem: UserChatItem) => {
    state.chats = [chatItem, ...state.chats];
  },
  ...alertsMutations,
};

export default chatsMutations;
