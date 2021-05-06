import { ActionTree } from 'vuex';
import { AlertsState, RootState } from '@/store/store-states';
import { namespaceAlertsMutation } from '@/store/modules';
import { CLEAR_ALERTS } from '@/store/constants/alerts-constants';

const alertsActions: ActionTree<AlertsState, RootState> = {
  [CLEAR_ALERTS]: ({ commit }) => {
    commit(namespaceAlertsMutation(CLEAR_ALERTS));
  },
};

export default alertsActions;
