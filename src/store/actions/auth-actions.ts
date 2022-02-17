import Vue from 'vue';
import { ActionTree, Commit } from 'vuex';
import { AppState, UserState } from '@/store/store-states';
import {
  ADD_ERROR,
  ADD_SUCCESS,
  SET_ERRORS,
} from '@/store/constants/alerts-constants';
import { LoginFormFields, RegisterFormFields } from '@/utils/auth-utils';
import { loginUser, registerUser } from '@/api/auth-api';
import { createAlertMessage, isFormErrorMessage } from '@/utils/alerts-utils';
import {
  GET_USER_PROFILE,
  LOGIN_USER,
  REGISTER_USER,
  SET_IS_AUTHENTICATED,
  SET_USER_PROFILE,
} from '@/store/constants/auth-constants';
import alertsActions from '@/store/actions/alerts-actions';
import { getUserProfile } from '@/api/search-api';

const authActions: ActionTree<UserState, AppState> = {
  [LOGIN_USER]: async ({ commit }, loginForm: LoginFormFields) => {
    try {
      const res = await loginUser(loginForm);
      const data = await res.json();

      if (res.ok) {
        // Store the provided token as a cookie.
        // Set the cookie to expire at the same time as the cookie.
        Vue.$cookies.set('token', data.token, '3m');
        // Set the user as authenticated.
        commit(SET_IS_AUTHENTICATED, true);
      } else if (isFormErrorMessage(data)) {
        commit(SET_ERRORS, data);
      } else {
        commit(ADD_ERROR, data);
      }
    } catch {
      const genericMessage = createAlertMessage(
        'An error occurred trying to sign you in!'
      );
      commit(ADD_ERROR, genericMessage);
    }
  },
  [REGISTER_USER]: async ({ commit }, registerForm: RegisterFormFields) => {
    try {
      const res = await registerUser(registerForm);
      const data = await res.json();

      if (res.ok) {
        commit(ADD_SUCCESS, data);
      } else if (isFormErrorMessage(data)) {
        commit(SET_ERRORS, data);
      } else {
        commit(ADD_ERROR, data);
      }
    } catch {
      const genericMessage = createAlertMessage(
        'An error occurred trying to register you!'
      );
      commit(ADD_ERROR, genericMessage);
    }
  },
  [GET_USER_PROFILE]: async ({ commit }) => {
    try {
      const res = await getUserProfile();
      const data = await res.json();

      if (res.ok) {
        commit(SET_USER_PROFILE, data);
      } else {
        unAuthenticateUser(commit);
      }
    } catch {
      unAuthenticateUser(commit);
    }
  },
  [SET_IS_AUTHENTICATED]: ({ commit }, isAuthenticated: boolean) => {
    commit(SET_IS_AUTHENTICATED, isAuthenticated);
  },
  ...alertsActions,
};

function unAuthenticateUser(commit: Commit) {
  if (!process.env.JEST_WORKER_ID) {
    console.error('An error occurred trying to fetch profile!');
  }
  Vue.$cookies.remove('token');
  commit(SET_IS_AUTHENTICATED, false);
}

export default authActions;
