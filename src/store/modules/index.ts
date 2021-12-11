import { ModuleTree } from 'vuex';
import { RootState } from '@/store/store-states';
import alertsModule from '@/store/modules/alerts-module';

export const ALERTS_NAMESPACE = 'alerts';

const appModules: ModuleTree<RootState> = {
  [ALERTS_NAMESPACE]: alertsModule,
};

/**
 * This function namespaces the provided mutation name and returns it.
 */
export function namespaceAlerts(mutation: string) {
  return `${ALERTS_NAMESPACE}/${mutation}`;
}

export default appModules;
