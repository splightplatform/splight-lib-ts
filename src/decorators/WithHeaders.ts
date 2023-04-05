import { AsyncFunction } from '../types.js';

type Headers = Record<string, string>;

export const withHeaders =
  <T extends AsyncFunction<[Headers, ...unknown[]], unknown>>(fn: T) =>
  (headers: Headers) =>
  (...args: Omit<Parameters<T>, 0>) =>
    fn(headers, ...args);
