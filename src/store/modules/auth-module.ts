import { Module } from 'vuex';
import { AppState, UserState } from '@/store/store-states';
import authActions from '@/store/actions/auth-actions';
import { DEFAULT_USER_STATE } from '@/utils/auth-utils';
import authMutations from '@/store/mutations/auth-mutations';

const authModule: Module<UserState, AppState> = {
  namespaced: true,
  state: DEFAULT_USER_STATE,
  mutations: authMutations,
  actions: authActions,
};

export default authModule;
