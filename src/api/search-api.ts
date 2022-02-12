import { getBrowserCookie } from '@/utils/misc-utils';

const SEARCH_API_PATH = '/api/search';

/**
 * This function handles making a request to the search api to return user results.
 *
 * @param value The value to use to search for users.
 */
export function searchUser(value: string) {
  const token = getBrowserCookie('token');
  return fetch(`${SEARCH_API_PATH}/user?name=${value}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
