import { ModuleTree } from 'vuex';
import { AppState } from '@/store/store-states';
import authModule from '@/store/modules/auth-module';
import chatsModule from '@/store/modules/chats-module';

export const ALERTS_NAMESPACE = 'alerts';
export const AUTH_NAMESPACE = 'auth';
export const CHATS_NAMESPACE = 'chats';

const appModules: ModuleTree<AppState> = {
  [AUTH_NAMESPACE]: authModule,
  [CHATS_NAMESPACE]: chatsModule,
};

/**
 * This function namespaces the provided mutation name for the alerts module and returns it.
 */
export function namespaceAlerts(mutation: string) {
  return `${ALERTS_NAMESPACE}/${mutation}`;
}

/**
 * This function namespaces the provided mutation name for the auth module and returns it.
 */
export function namespaceAuth(mutation: string) {
  return `${AUTH_NAMESPACE}/${mutation}`;
}

/**
 * This function namespaces the provided mutation name for the chats module and returns it.
 */
export function namespaceChats(mutation: string) {
  return `${CHATS_NAMESPACE}/${mutation}`;
}

export default appModules;
