import { get, post, patch, del } from "./base-methods.js";
import { Headers, Input, PaginatedCollection } from "../types.js";
export interface SplightCredentials {
  splight_access_id: string;
  splight_access_key: string;
}

export interface Asset {
  id: string;
  name: string;
}

export const getHeaders = (credentials: SplightCredentials) => {
  return {
    Authorization: `Splight ${credentials.splight_access_id} ${credentials.splight_access_key}`,
  };
};

export type BaseRestClient<T> = ReturnType<typeof useBaseRestClient>;

export const useBaseRestClient = <T>(
  resource_url: string,
  headers: Headers
) => {
  return {
    list: (): Promise<PaginatedCollection<T>> => get(resource_url, headers),
    retrieve: (pk: string): Promise<T> => get(`${resource_url}/${pk}`, headers),
    create: (data: Input<T>): Promise<T> => post(resource_url, data, headers),
    update: (pk: string, data: Partial<T>): Promise<T> =>
      patch(`${resource_url}/${pk}`, data, headers),
    destroy: (pk: string): Promise<void> =>
      del(`${resource_url}/${pk}`, headers),
  };
};
