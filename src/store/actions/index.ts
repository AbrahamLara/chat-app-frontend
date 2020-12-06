import { ActionTree } from 'vuex';
import { AppState } from '@/store/states';
import { THEME } from '@/utils/theme';

export const SET_THEME = 'setTheme';

// Actions that affect how the application looks and behaves.
const appActions: ActionTree<AppState, AppState> = {
  [SET_THEME]: ({ commit }, theme: THEME) => {
    commit(SET_THEME, theme);
  }
};

export default appActions;
