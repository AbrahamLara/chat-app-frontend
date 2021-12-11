/**
 * An user item that can be used for contexts such as displaying a user search or chat result.
 */
import Vue from 'vue';

export interface UserItem {
  /**
   * The name of the user.
   */
  name: string;

  /**
   * The timestamp to determine the duration of time relative to today.
   */
  timeStamp?: string | number;

  /**
   * A user message.
   */
  message?: string;
}

/**
 * Returns a cookie stored in the page with the given name.
 */
export function getBrowserCookie(name: string) {
  return Vue.$cookies.get(name);
}
