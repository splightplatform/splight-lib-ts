import axios from "axios";
import { Headers, Input } from "../types.js";
import { withRetries } from "./withRetries.js";

export const get = async <T>(url: string, headers: Headers): Promise<T> => {
  const { data } = await withRetries(axios<T>)(url, { headers });
  return data;
};

export const post = async <T>(
  url: string,
  data: Input<T>,
  headers: Headers
): Promise<T> => {
  const { data: response } = await withRetries(axios<T>)(url, {
    method: "post",
    data,
    headers,
  });
  return response;
};

export const patch = async <T>(
  url: string,
  data: Partial<T>,
  headers: Headers
): Promise<T> => {
  const { data: response } = await withRetries(axios<T>)(url, {
    method: "patch",
    data,
    headers,
  });
  return response;
};

export const del = async <T>(url: string, headers: Headers): Promise<T> => {
  const { data: response } = await withRetries(axios<T>)(url, {
    method: "delete",
    headers,
  });
  return response;
};
