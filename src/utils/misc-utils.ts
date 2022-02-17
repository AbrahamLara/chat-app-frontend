/**
 * A user item that can be used for contexts such as displaying a user search or chat result.
 */
import Vue from 'vue';

export interface UserItem {
  /**
   * The id of the user.
   */
  id: string;

  /**
   * The name of the user.
   */
  name: string;
}

export interface ChatItem {
  /**
   * The id of the chat the user is part of.
   */
  id: string;

  /**
   * A user message.
   */
  message?: string;

  /**
   * The name of the user who sent the latest message.
   */
  author: string;

  /**
   * The timestamp to determine the duration of time relative to today.
   */
  createdAt?: string | number;
}

/**
 * Returns a cookie stored in the page with the given name.
 */
export function getBrowserCookie(name: string) {
  return Vue.$cookies.get(name);
}

export function cloneObject(object: Record<string, any>) {
  return JSON.parse(JSON.stringify(object));
}
