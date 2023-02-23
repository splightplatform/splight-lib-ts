import { get, post, patch, del } from "./BaseMethods.js";
import {
  BaseListParams,
  Headers,
  Input,
  PaginatedCollection,
  Params,
} from "../types.js";
import { Path } from "../Urls.js";

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

export const BaseRestClient = <I, O = I, Q extends Params<O> = Params<O>>(
  base_path: Path,
  headers: Headers
) => {
  return {
    list: (params?: Q) =>
      get<PaginatedCollection<O>>(base_path.url, headers, ...[params]),
    retrieve: (pk: string): Promise<O> => get(base_path.slash(pk).url, headers),
    create: (data: I): Promise<O> => post(base_path.url, data, headers),
    update: (pk: string, data: Partial<I>): Promise<O> =>
      patch(base_path.slash(pk).url, data, headers),
    destroy: (pk: string): Promise<void> =>
      del(base_path.slash(pk).url, headers),
  };
};
