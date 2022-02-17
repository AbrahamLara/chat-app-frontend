import fetch from 'cross-fetch';
import { getBrowserCookie } from '@/utils/misc-utils';

const MESSAGE_API_PATH = '/api/message';

/**
 * This function handles making an api call to fetch all messages in a group chat.
 */
export async function getMessages(chatID: string) {
  const token = getBrowserCookie('token');

  return fetch(`${MESSAGE_API_PATH}/${chatID}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}

/**
 * This function handles making an api call to fetch a user's group chats.
 */
export async function sendMessage(chatID: string, message: string) {
  const token = getBrowserCookie('token');

  return fetch(`${MESSAGE_API_PATH}/${chatID}`, {
    method: 'post',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}
