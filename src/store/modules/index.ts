import { ModuleTree } from 'vuex';
import { RootState } from '@/store/store-states';
import alertsModule from '@/store/modules/alerts-module';

const ALERTS_MODULE = 'alerts';

const appModules: ModuleTree<RootState> = {
  [ALERTS_MODULE]: alertsModule,
};

/**
 * This function namespaces the provided mutation name and returns it.
 */
function namespaceAlertsMutation(mutation: string) {
  return `${ALERTS_MODULE}/${mutation}`;
}

export default appModules;

export { ALERTS_MODULE, namespaceAlertsMutation };
