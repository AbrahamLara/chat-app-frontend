import { THEME } from '@/utils/theme-utils';
import { FormAlertMessage, AlertMessage } from '@/utils/alerts-utils';
import { UserChatItem } from '@/utils/chat-utils';

/**
 * Describes the state of application.
 */
interface AppState {
  /**
   * The current theme to render the app in. Either dark or light.
   */
  theme: THEME;

  /**
   * The list of chat groups the user is in.
   */
  chats?: ChatsState;

  /**
   * The user's authenticated state.
   */
  auth?: UserState;
}

interface ChatsState extends AlertsState {
  /**
   * Describes the state of the user's chat list.
   */
  chats: UserChatItem[];
}

/**
 * Describes the user's authenticated state.
 */
interface UserState extends AlertsState {
  isAuthenticated: boolean;
}

/**
 * Describes the state of alert types on the page.
 */
interface AlertsState {
  alerts: {
    /**
     * Login form error messages.
     */
    errors: (AlertMessage | FormAlertMessage)[];

    /**
     * Register form error messages.
     */
    successes: AlertMessage[];
  };
}

export { AppState, ChatsState, AlertsState, UserState };
