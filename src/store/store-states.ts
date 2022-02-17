import { THEME } from '@/utils/theme-utils';
import { AlertMessage, FormAlertMessage } from '@/utils/alerts-utils';
import { UserChatItem } from '@/utils/chat-utils';
import { UserProfile } from '@/utils/auth-utils';
import { MessageAuthor, MessageItem } from '@/utils/message-utils';

/**
 * Describes the state of application.
 */
export interface AppState {
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

  /**
   * The state of the group chat messages.
   */
  messages?: MessagesState;
}

export interface ChatsState extends AlertsState {
  /**
   * Describes the state of the user's chat list.
   */
  chats: UserChatItem[];

  /**
   * A list of user's who are currently typing the chat.
   */
  userTypingMap: Map<string, MessageAuthor[]>;

  /**
   * The id of the current chat being viewed.
   */
  currentChatID: string;
}

/**
 * Describes the user's authenticated state.
 */
export interface UserState extends AlertsState {
  /**
   * An object holding the authenticated user's profile.
   */
  user: UserProfile;

  /**
   * Determines if the user is authenticated.
   */
  isAuthenticated: boolean;
}

export interface MessagesState extends AlertsState {
  /**
   * A map of the chat id associated to the messages list.
   */
  map: Map<string, MessageItem[]>;
}

/**
 * Describes the state of alert types on the page.
 */
export interface AlertsState {
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
