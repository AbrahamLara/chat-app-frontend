import { MutationTree } from 'vuex';
import { RootState } from '@/store/store-states';
import { THEME } from '@/utils/theme-utils';
import {
  SET_IS_AUTHENTICATED,
  SET_THEME,
} from '@/store/constants/root-constants';

// Mutations that change how the application looks and behaves.
const appMutations: MutationTree<RootState> = {
  [SET_THEME]: (state: RootState, theme: THEME) => {
    state.theme = theme;
  },
  [SET_IS_AUTHENTICATED]: (state: RootState, isAuthenticated: boolean) => {
    state.user.isAuthenticated = isAuthenticated;
  },
};

export default appMutations;
