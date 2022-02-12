import { ActionTree } from 'vuex';
import { THEME } from '@/utils/theme-utils';
import { SET_THEME } from '@/store/constants/root-constants';
import { AppState } from '@/store/store-states';

// Actions that affect how the application looks and behaves.
const appActions: ActionTree<AppState, AppState> = {
  [SET_THEME]: ({ commit }, theme: THEME) => {
    commit(SET_THEME, theme);
  },
};

export default appActions;
