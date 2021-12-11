import { ActionTree } from 'vuex';
import { AlertsState, RootState } from '@/store/store-states';
import { namespaceAlerts } from '@/store/modules';
import { CLEAR_ALERTS, SET_ERRORS } from '@/store/constants/alerts-constants';

const alertsActions: ActionTree<AlertsState, RootState> = {
  [CLEAR_ALERTS]: ({ commit }) => {
    commit(namespaceAlerts(CLEAR_ALERTS));
  },
  // [SET_ERRORS]: ({ commit}) => {
  //
  // },
};

export default alertsActions;
