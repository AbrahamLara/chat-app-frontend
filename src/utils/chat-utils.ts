import { ChatsState } from '@/store/store-states';
import { DEFAULT_ALERTS_STATE } from '@/store/modules/alerts-module';

export const DEFAULT_CHATS_STATE: ChatsState = {
  ...DEFAULT_ALERTS_STATE,
  chats: [],
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
  message: {
    /**
     * The chat message text send by the author.
     */
    text: string;

    /**
     * The author of the chat message.
     */
    author: string;

    /**
     * The timestamp of when the chat message was created.
     */
    createdAt: string;
  };
}
