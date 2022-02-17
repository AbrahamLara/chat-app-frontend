import { ChatsState } from '@/store/store-states';
import { DEFAULT_ALERTS_STATE } from '@/store/modules/alerts-module';
import { MessageAuthor, MessageItem } from '@/utils/message-utils';
import { cloneObject } from '@/utils/misc-utils';

export const DEFAULT_CHATS_STATE: ChatsState = {
  ...cloneObject(DEFAULT_ALERTS_STATE),
  chats: [],
  userTypingMap: new Map<string, MessageAuthor[]>(),
  currentChatID: '',
};

export const CREATE_CHAT_SUCCESS_MESSAGE = 'Successfully created chat';

export interface CreateChatFormFields {
  /**
   * The name to give the new chat.
   */
  chatName: string;

  /**
   * The first message to send to the chat.
   */
  message: string;

  /**
   * An array of user ids from members to add to the group chat.
   */
  userIDs: string[];
}

export interface UserChatItem {
  /**
   * The id of the user chat.
   */
  id: string;

  /**
   * The name of the chat.
   */
  name: string;

  /**
   * The object representing the chat message sent to the chat.
   */
  message: Omit<MessageItem, 'author'> & { author: string };
}

export interface ChatCreatedData {
  chat: UserChatItem;

  /**
   * A list of user ids from members part of the newly created chat.
   */
  memberIDs: string[];
}
