import { get, post, patch, del } from "./base-methods.js";
import { Headers, Input, PaginatedCollection } from "../types.js";
import { Path } from "../urls.js";
import { withRetries } from "../decorators/with-retries.js";

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

export type BaseRestClient<T> = ReturnType<typeof BaseRestClient>;

export const BaseRestClient = <I, O = I>(base_path: Path, headers: Headers) => {
  return {
    list: (): Promise<PaginatedCollection<O>> => get(base_path.url, headers),
    retrieve: (pk: string): Promise<O> => get(base_path.slash(pk).url, headers),
    create: (data: I): Promise<O> => post(base_path.url, data, headers),
    update: (pk: string, data: Partial<I>): Promise<O> =>
      patch(base_path.slash(pk).url, data, headers),
    destroy: (pk: string): Promise<void> =>
      del(base_path.slash(pk).url, headers),
  };
};
