import { get, post, patch, del } from './BaseMethods.js';
import { Headers, PaginatedCollection } from '../types.js';
import { Path } from '../Urls.js';

export interface SplightCredentials {
  splight_access_id: string;
  splight_access_key: string;
}

export interface Asset {
  id: string;
  name: string;
}

export const getHeaders = () => {
  const credentials: SplightCredentials = {
    splight_access_id: process.env.SPLIGHT_ACCESS_ID ?? '',
    splight_access_key: process.env.SPLIGHT_ACCESS_KEY ?? '',
  };
  return {
    Authorization: `Splight ${credentials.splight_access_id} ${credentials.splight_access_key}`,
  } as Headers;
};

export type BaseRestClient<T> = ReturnType<typeof BaseRestClient<T>>;

export const BaseRestClient = <
  I,
  O = I,
  Q extends Record<string, string | number | boolean> = Record<
    string,
    string | number | boolean
  >
>(
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
