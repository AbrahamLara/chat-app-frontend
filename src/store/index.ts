import Vue from 'vue';
import Vuex from 'vuex';
import appActions from '@/store/actions';
import appMutations from '@/store/mutations';
import appModules from '@/store/modules';
import { THEME } from '@/utils/theme-utils';
import { AppState } from '@/store/store-states';

Vue.use(Vuex);

export const DEFAULT_ROOT_STATE: AppState = {
  theme: THEME.LIGHT,
};

export default new Vuex.Store<AppState>({
  state: { ...DEFAULT_ROOT_STATE },
  mutations: appMutations,
  actions: appActions,
  modules: appModules,
});
