import { ModuleTree } from 'vuex';
import { AppState } from '@/store/store-states';
import authModule from '@/store/modules/auth-module';
import chatsModule from '@/store/modules/chats-module';
import messageModule from '@/store/modules/message-module';

export const ALERTS_NAMESPACE = 'alerts';
export const AUTH_NAMESPACE = 'auth';
export const CHATS_NAMESPACE = 'chats';
export const MESSAGES_NAMESPACE = 'messages';

const appModules: ModuleTree<AppState> = {
  [AUTH_NAMESPACE]: authModule,
  [CHATS_NAMESPACE]: chatsModule,
  [CHATS_NAMESPACE]: chatsModule,
  [MESSAGES_NAMESPACE]: messageModule,
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

/**
 * This function namespaces the provided mutation name for the messages module and returns it.
 */
export function namespaceMessages(mutation: string) {
  return `${MESSAGES_NAMESPACE}/${mutation}`;
}

export default appModules;
