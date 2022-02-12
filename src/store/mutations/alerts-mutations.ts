import { MutationTree } from 'vuex';
import { AlertsState } from '@/store/store-states';
import { AlertMessage, ErrorPayload } from '@/utils/alerts-utils';
import {
  SET_ERRORS,
  ADD_ERROR,
  ADD_SUCCESS,
  CLEAR_ALERTS,
} from '@/store/constants/alerts-constants';

const alertsMutations: MutationTree<AlertsState> = {
  [SET_ERRORS]: (state: AlertsState, errorPayload: ErrorPayload) => {
    state.alerts.errors = errorPayload.errors;
  },
  [ADD_ERROR]: (state: AlertsState, error: AlertMessage) => {
    state.alerts.errors.push(error);
  },
  [ADD_SUCCESS]: (state: AlertsState, success: AlertMessage) => {
    state.alerts.successes.push(success);
  },
  [CLEAR_ALERTS]: (state: AlertsState) => {
    state.alerts.errors = [];
    state.alerts.successes = [];
  },
};

export default alertsMutations;
