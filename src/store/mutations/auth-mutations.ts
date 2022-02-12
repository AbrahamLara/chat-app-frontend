import { MutationTree } from 'vuex';
import { UserState } from '@/store/store-states';
import { SET_IS_AUTHENTICATED } from '@/store/constants/auth-constants';
import alertsMutations from '@/store/mutations/alerts-mutations';

// Mutations that change how the application looks and behaves.
const authMutations: MutationTree<UserState> = {
  [SET_IS_AUTHENTICATED]: (state: UserState, isAuthenticated: boolean) => {
    state.isAuthenticated = isAuthenticated;
  },
  ...alertsMutations,
};

export default authMutations;
