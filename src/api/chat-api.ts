import fetch from 'cross-fetch';
import { CreateChatFormFields } from '@/utils/chat-utils';
import { getBrowserCookie } from '@/utils/misc-utils';

const CHAT_API_PATH = '/api/chat';

/**
 * This function handles making an api call to create a group chat.
 *
 * @param createChatForm Form values for creating a group chat.
 */
export async function createChat(createChatForm: CreateChatFormFields) {
  const token = getBrowserCookie('token');

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
export async function fetchChats() {
  const token = getBrowserCookie('token');

  return fetch(CHAT_API_PATH, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}
