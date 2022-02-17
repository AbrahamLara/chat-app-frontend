import { MessagesState } from '@/store/store-states';
import { DEFAULT_ALERTS_STATE } from '@/store/modules/alerts-module';
import { UserProfile } from '@/utils/auth-utils';

export const DEFAULT_MESSAGES_STATE: MessagesState = {
  ...DEFAULT_ALERTS_STATE,
  map: new Map(),
};

export const FAILED_TO_FETCH_MESSAGES_ERROR =
  'An error occurred fetching chat messages';

export const FAILED_TO_SEND_MESSAGE_ERROR =
  'An error occurred sending chat messages';

export type MessageAuthor = Omit<UserProfile, 'email'>;

export interface MessageItem {
  /**
   * The id of the chat message.
   */
  id: string;

  /**
   * The chat message text sent by the author.
   */
  text: string;

  /**
   * The author of the chat message.
   */
  author: MessageAuthor;

  /**
   * The timestamp of when the chat message was created.
   */
  createdAt: string;
}

export interface UserTypingMessageData {
  /**
   * The id of the chat to broadcast to that a member is typing a message.
   */
  chatID: string;

  /**
   * The name of the user typing a message to the chat.
   */
  user: MessageAuthor;

  /**
   * Determines if the user is typing.
   */
  isTyping: boolean;
}

export interface SendChatMessageData {
  /**
   * The id of the chat to broadcast the newly created message to.
   */
  chatID: string;

  /**
   * The object of the message to send to other user's in the chat.
   */
  message: MessageItem;
}
