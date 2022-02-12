import TimeAgo from 'javascript-time-ago';

const timeAgo = new TimeAgo('en-US');

/**
 * Returns a twitter "time ago" label using the provided date/time value. This helps display how much time has elapsed
 * from the given date/time string.
 *
 * @param value date/time string.
 */
export function getTwitterTimeAgoLabel(value: string | number) {
  return timeAgo.format(new Date(value), 'twitter');
}
