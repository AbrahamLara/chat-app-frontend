import { Module } from 'vuex';
import { AppState, ChatsState } from '@/store/store-states';
import chatsMutations from '@/store/mutations/chats-mutations';
import chatsActions from '@/store/actions/chats-actions';
import { DEFAULT_CHATS_STATE } from '@/utils/chat-utils';

const chatsModule: Module<ChatsState, AppState> = {
  namespaced: true,
  state: DEFAULT_CHATS_STATE,
  mutations: chatsMutations,
  actions: chatsActions,
};

export default chatsModule;
