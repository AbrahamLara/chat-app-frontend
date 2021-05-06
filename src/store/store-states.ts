import { THEME } from '@/utils/theme-utils';
import { Module } from 'vuex';
import { FormAlertMessage, AlertMessage } from '@/utils/alerts-utils';

interface RootState {
  theme: THEME;
  user: UserState;
}

/**
 * Describes the state of application.
 */
interface AppState extends RootState {
  alerts: AlertsState;
}

/**
 * Describes the user's authenticated state.
 */
interface UserState {
  isAuthenticated: boolean;
}

/**
 * Describes the state of alert types on the page.
 */
interface AlertsState {
  /**
   * Login form error messages.
   */
  errors: (AlertMessage | FormAlertMessage)[];

  /**
   * Register form error messages.
   */
  successes: AlertMessage[];
}

/**
 * Describes the current app modules.
 */
interface AppModules {
  alerts: Module<any, AlertsState>;
}

export { RootState, AppState, AlertsState, AppModules, UserState };
