const sleep = (s: number) => new Promise((r) => setTimeout(r, s));

export function withRetries<T extends (...args: any[]) => any>(
  fn: T,
  times: number = 3,
  delay: number = 500,
  delay_factor: number = 2
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
  return async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (err) {
      if (times > 0) {
        sleep(delay);
        return await withRetries(fn, times - 1, delay * delay_factor)(...args);
      } else {
        throw err;
      }
    }
  };
}

type test = Parameters<typeof sleep>;
