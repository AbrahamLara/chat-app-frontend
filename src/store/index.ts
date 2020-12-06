import Vue from 'vue';
import Vuex from 'vuex';
import appActions from '@/store/actions';
import appMutations from '@/store/mutations';
import { THEME } from '@/utils/theme';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: THEME.LIGHT
  },
  mutations: appMutations,
  actions: appActions,
  modules: {}
});
