import { MutationTree } from 'vuex';
import { THEME } from '@/utils/theme-utils';
import { SET_THEME } from '@/store/constants/root-constants';
import { AppState } from '@/store/store-states';

// Mutations that change how the application looks and behaves.
const appMutations: MutationTree<AppState> = {
  [SET_THEME]: (state: AppState, theme: THEME) => {
    state.theme = theme;
  },
};

export default appMutations;
