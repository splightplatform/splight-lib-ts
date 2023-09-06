export const withHeaders =
  <T extends (...args: any[]) => any>(fn: T) =>
  (headers: Headers) =>
  (...args: Omit<Parameters<T>, 'headers'>) =>
    fn(...args, headers);
