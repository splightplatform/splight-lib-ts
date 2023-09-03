import { AxiosResponse } from 'axios';
import { ACTIVE_MODE_KEY, AsyncFunction, Headers } from '../types.js';
import { API_HOST, MOCK_HOST } from '../Urls.js';

export const withHeaders =
  <
    T,
    U extends AsyncFunction<[string, Headers, ...unknown[]], AxiosResponse<T>>
  >(
    fn: U
  ) =>
  (
    url: string,
    headers: Headers,
    ...args: unknown[]
  ): Promise<AxiosResponse<T>> => {
    let baseUrl = API_HOST;

    if (headers) {
      const activeMode = headers[ACTIVE_MODE_KEY];
      if (activeMode) {
        baseUrl = MOCK_HOST;
      }
      delete headers[ACTIVE_MODE_KEY];
    }

    const fullUrl = baseUrl + url;
    console.log('⚡️Splight - withHeaders', fullUrl, headers);
    return fn(fullUrl, headers, ...args);
  };
