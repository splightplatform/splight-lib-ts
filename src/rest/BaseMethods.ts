import axios, { ResponseType } from 'axios';
import { withLogging } from '../decorators/WithLogging.js';
import { withRetries } from '../decorators/WithRetries.js';
import { Headers } from '../types.js';

export const get = async <T>(
  url: string,
  headers: Headers,
  params?: Record<string, string | number | boolean | undefined>,
  responseType?: ResponseType
): Promise<T> => {
  const { data } = await withLogging(
    'GET',
    url,
    axios<T>
  )(url, { headers, params, responseType });

  return data;
};

export const post = async <I, O>(
  url: string,
  data: I,
  headers: Headers,
  params?: Record<string, string | number | boolean | undefined>,
  responseType?: ResponseType
): Promise<O> => {
  const { data: response } = await withRetries(() => {
    return withLogging(
      'POST',
      url,
      axios<O>
    )(url, {
      method: 'post',
      data,
      headers,
      params,
      responseType,
    });
  })();

  return response;
};

export const patch = async <I, O>(
  url: string,
  data: I,
  headers: Headers
): Promise<O> => {
  const { data: response } = await withRetries(() => {
    return withLogging(
      'PATCH',
      url,
      axios<O>
    )(url, {
      method: 'patch',
      data,
      headers,
    });
  })();

  return response;
};

export const put = async <I, O>(
  url: string,
  data: I,
  headers: Headers
): Promise<O> => {
  const { data: response } = await withRetries(() => {
    return withLogging(
      'PUT',
      url,
      axios<O>
    )(url, {
      method: 'put',
      data,
      headers,
    });
  })();

  return response;
};

export const del = async <T>(url: string, headers: Headers): Promise<T> => {
  const { data: response } = await withRetries(() => {
    return withLogging(
      'DELETE',
      url,
      axios<T>
    )(url, {
      method: 'delete',
      headers,
    });
  })();

  return response;
};

export const options = async <T>(url: string, headers: Headers): Promise<T> => {
  const { data: response } = await withRetries(() => {
    return withLogging(
      'OPTIONS',
      url,
      axios<T>
    )(url, {
      method: 'options',
      headers,
    });
  })();

  return response;
};
