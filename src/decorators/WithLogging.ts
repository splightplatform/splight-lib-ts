import { AsyncFunction } from '../types.js';

export function withLogging<T extends unknown[], R>(
  method: string,
  url: string,
  fn: AsyncFunction<T, R>
) {
  return async (...args: T) => {
    const start = performance.now();
    const returned = await fn(...args);
    const end = performance.now();

    console.log(
      `⚡️Splight - ${method}`,
      `${url} - - ${(end - start).toFixed(3)} ms`
    );

    return returned;
  };
}
