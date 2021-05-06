import { Module } from 'vuex';
import { AlertsState, RootState } from '@/store/store-states';
import alertsMutations from '@/store/mutations/alerts-mutations';
import alertsActions from '@/store/actions/alerts-actions';

const DEFAULT_ALERTS_STATE: AlertsState = {
  errors: [],
  successes: [],
};

const alertsModule: Module<AlertsState, RootState> = {
  namespaced: true,
  state: { ...DEFAULT_ALERTS_STATE },
  mutations: alertsMutations,
  actions: alertsActions,
};

export default alertsModule;

export { DEFAULT_ALERTS_STATE };
