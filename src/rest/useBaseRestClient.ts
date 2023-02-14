import { get, post, patch, del } from "./base-methods.js";
import { Headers, Input, PaginatedCollection } from "../types.js";
import { Router } from "../urls.js";
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
  } as Headers;
};

export type BaseRestClient<T> = ReturnType<typeof useBaseRestClient>;

export const useBaseRestClient = <T>(router: Router, headers: Headers) => {
  return {
    list: (): Promise<PaginatedCollection<T>> => get(router.base.url, headers),
    retrieve: (pk: string): Promise<T> => get(router.detail(pk).url, headers),
    create: (data: Input<T>): Promise<T> =>
      post(router.base.url, data, headers),
    update: (pk: string, data: Partial<T>): Promise<T> =>
      patch(router.detail(pk).url, data, headers),
    destroy: (pk: string): Promise<void> => del(router.detail(pk).url, headers),
  };
};
