import { MutationTree } from 'vuex';
import { UserState } from '@/store/store-states';
import {
  SET_IS_AUTHENTICATED,
  SET_USER_PROFILE,
} from '@/store/constants/auth-constants';
import alertsMutations from '@/store/mutations/alerts-mutations';
import { UserProfile } from '@/utils/auth-utils';

// Mutations that change how the application looks and behaves.
const authMutations: MutationTree<UserState> = {
  [SET_IS_AUTHENTICATED]: (state: UserState, isAuthenticated: boolean) => {
    state.isAuthenticated = isAuthenticated;
    state.user = { id: '', name: '', email: '' };
  },
  [SET_USER_PROFILE]: (state: UserState, profile: UserProfile) => {
    state.user = profile;
  },
  ...alertsMutations,
};

export default authMutations;
