import fetch from 'cross-fetch';
import { CreateChatFormFields } from '@/utils/chat-utils';

const CHAT_API_PATH = '/api/chat';

/**
 * This function handles making an api call to create a group chat.
 *
 * @param createChatForm Form values for creating a group chat.
 * @param token The generated token
 */
export async function createChat(
  createChatForm: CreateChatFormFields,
  token: string
) {
  return fetch(CHAT_API_PATH, {
    method: 'post',
    body: JSON.stringify(createChatForm),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}

/**
 * This function handles making an api call to fetch a user's group chats.
 */
export async function fetchChats(token: string) {
  return fetch(CHAT_API_PATH, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}
