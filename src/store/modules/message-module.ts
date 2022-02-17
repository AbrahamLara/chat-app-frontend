import { Module } from 'vuex';
import { AppState, MessagesState } from '@/store/store-states';
import messagesMutations from '@/store/mutations/message-mutations';
import messagesActions from '@/store/actions/message-actions';
import { DEFAULT_MESSAGES_STATE } from '@/utils/message-utils';

const messageModule: Module<MessagesState, AppState> = {
  namespaced: true,
  state: DEFAULT_MESSAGES_STATE,
  mutations: messagesMutations,
  actions: messagesActions,
};

export default messageModule;
