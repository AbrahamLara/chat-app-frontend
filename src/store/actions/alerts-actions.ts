import { ActionTree } from 'vuex';
import { AlertsState, AppState } from '@/store/store-states';
import { CLEAR_ALERTS } from '@/store/constants/alerts-constants';

const alertsActions: ActionTree<AlertsState, AppState> = {
  [CLEAR_ALERTS]: ({ commit }) => {
    commit(CLEAR_ALERTS);
  },
};

export default alertsActions;
