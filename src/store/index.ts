import Vue from 'vue';
import Vuex from 'vuex';
import appActions from '@/store/actions';
import appMutations from '@/store/mutations';
import appModules from '@/store/modules';
import { THEME } from '@/utils/theme-utils';
import { RootState } from '@/store/store-states';
import { DEFAULT_USER_STATE } from '@/utils/auth-utils';

Vue.use(Vuex);

const DEFAULT_ROOT_STATE: RootState = {
  theme: THEME.LIGHT,
  user: DEFAULT_USER_STATE,
};

export default new Vuex.Store({
  state: { ...DEFAULT_ROOT_STATE },
  mutations: appMutations,
  actions: appActions,
  modules: appModules,
});

export { DEFAULT_ROOT_STATE };
