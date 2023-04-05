import { AsyncFunction } from '../types.js';

const sleep = (s: number) => new Promise((r) => setTimeout(r, s));

export function withRetries<T extends unknown[], R>(
  fn: AsyncFunction<T, R>,
  times = 3,
  delay = 500,
  delay_factor = 2
): AsyncFunction<T, R> {
  return async (...args: T) => {
    try {
      return await fn(...args);
    } catch (err) {
      if (times > 0) {
        await sleep(delay);
        return await withRetries(fn, times - 1, delay * delay_factor)(...args);
      } else {
        throw err;
      }
    }
  };
}
