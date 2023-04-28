import axios from 'axios';
import { Headers } from '../types.js';
import { withRetries } from '../decorators/WithRetries.js';

export const get = async <T>(
  url: string,
  headers: Headers,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> => {
  console.log('⚡️Splight -  GET', url);
  const { data } = await withRetries(axios<T>)(url, { headers, params });
  return data;
};

export const post = async <I, O>(
  url: string,
  data: I,
  headers: Headers
): Promise<O> => {
  console.log('⚡️Splight -  POST', url);
  const { data: response } = await withRetries(axios<O>)(url, {
    method: 'post',
    data,
    headers,
  });
  return response;
};

export const patch = async <I, O>(
  url: string,
  data: I,
  headers: Headers
): Promise<O> => {
  console.log('⚡️Splight -  PATCH', url);
  const { data: response } = await withRetries(axios<O>)(url, {
    method: 'patch',
    data,
    headers,
  });
  return response;
};

export const del = async <T>(url: string, headers: Headers): Promise<T> => {
  console.log('⚡️Splight -  DELETE', url);
  const { data: response } = await withRetries(axios<T>)(url, {
    method: 'delete',
    headers,
  });
  return response;
};

export const options = async <T>(url: string, headers: Headers): Promise<T> => {
  console.log('⚡️Splight -  OPTIONS', url);
  const { data: response } = await withRetries(axios<T>)(url, {
    method: 'options',
    headers,
  });
  return response;
};
