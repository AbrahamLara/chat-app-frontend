import { MutationTree } from 'vuex';
import { AppState } from '@/store/states';
import { SET_THEME } from '@/store/actions';
import { THEME } from '@/utils/theme';

// Mutations that change how the application looks and behaves.
const appMutations: MutationTree<AppState> = {
  [SET_THEME]: (state, theme: THEME) => {
    state.theme = theme;
  }
};

export default appMutations;
