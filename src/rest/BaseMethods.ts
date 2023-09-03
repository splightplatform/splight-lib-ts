import axios, { ResponseType } from 'axios';
import { withLogging } from '../decorators/WithLogging.js';
import { withRetries } from '../decorators/WithRetries.js';
import { withHeaders } from '../decorators/WithHeaders.js';
import { Headers } from '../types.js';

export const get = async <T>(
  url: string,
  headers: Headers,
  params?: Record<string, string | number | boolean | undefined>,
  responseType?: ResponseType
): Promise<T> => {
  console.log('⚡️Splight - get', url, headers);
  const { data: response } = await withRetries(() => {
    return withHeaders(withLogging('GET', url, axios<T>))(url, headers, {
      params,
      responseType,
    });
  })();

  return response as T;
};

export const post = async <I, O>(
  url: string,
  data: I,
  headers: Headers,
  params?: Record<string, string | number | boolean | undefined>,
  responseType?: ResponseType
): Promise<O> => {
  console.log('⚡️Splight - post', url, headers, data, params, responseType);
  const { data: response } = await withRetries(() => {
    return withHeaders(withLogging('POST', url, axios<O>))(url, headers, {
      method: 'post',
      data,
      params,
      responseType,
    });
  })();

  return response as O;
};

export const patch = async <I, O>(
  url: string,
  data: I,
  headers: Headers
): Promise<O> => {
  console.log('⚡️Splight - patch', url, headers, data);
  const { data: response } = await withRetries(() => {
    return withHeaders(withLogging('PATCH', url, axios<O>))(url, headers, {
      method: 'patch',
      data,
    });
  })();

  return response as O;
};

export const del = async <T>(url: string, headers: Headers): Promise<T> => {
  console.log('⚡️Splight - delete', url, headers);
  const { data: response } = await withRetries(() => {
    return withHeaders(withLogging('DELETE', url, axios<T>))(url, headers, {
      method: 'delete',
    });
  })();

  return response as T;
};

export const options = async <T>(url: string, headers: Headers): Promise<T> => {
  console.log('⚡️Splight - options', url, headers);
  const { data: response } = await withRetries(() => {
    return withHeaders(withLogging('OPTIONS', url, axios<T>))(url, headers, {
      method: 'options',
    });
  })();

  return response as T;
};
