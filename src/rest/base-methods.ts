import axios from "axios";
import { Input } from "../types.js";

export const get = async <T>(
  url: string,
  headers: Record<string, string>
): Promise<T> => {
  const { data: response } = await axios.get<T>(url, { headers });
  return response;
};

export const post = async <T>(
  url: string,
  data: Input<T>,
  headers: Record<string, string>
): Promise<T> => {
  const { data: response } = await axios.post<T>(url, data, { headers });
  return response;
};

export const patch = async <T>(
  url: string,
  data: Partial<T>,
  headers: Record<string, string>
): Promise<T> => {
  const { data: response } = await axios.patch<T>(url, data, { headers });
  return response;
};

export const del = async (
  url: string,
  headers: Record<string, string>
): Promise<void> => await axios.delete(url, { headers });
