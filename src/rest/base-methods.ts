import axios from "axios";
import { Headers, Input } from "../types.js";

export const get = async <T>(url: string, headers: Headers): Promise<T> => {
  const { data: response } = await axios.get<T>(url, { headers });
  return response;
};

export const post = async <T>(
  url: string,
  data: Input<T>,
  headers: Headers
): Promise<T> => {
  const { data: response } = await axios.post<T>(url, data, { headers });
  return response;
};

export const patch = async <T>(
  url: string,
  data: Partial<T>,
  headers: Headers
): Promise<T> => {
  const { data: response } = await axios.patch<T>(url, data, { headers });
  return response;
};

export const del = async <T>(url: string, headers: Headers): Promise<T> =>
  await axios.delete(url, { headers });
