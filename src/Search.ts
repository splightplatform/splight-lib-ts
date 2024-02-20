import { get } from './rest/BaseMethods.js';
import {
  BasePaginatedCollection,
  Headers,
  PaginatedCollection,
} from './types.js';
import { withGetNext } from './rest/BaseRestClient.js';
import { Path } from './Urls.js';

export interface SearchResults {
  id: string;
  name: string;
  type: string;
  metadata: Record<string, string>;
}

export const Search =
  (headers: Headers) =>
  (params?: {
    name__icontains: string;
    page?: number;
  }): Promise<PaginatedCollection<SearchResults>> =>
    get<BasePaginatedCollection<SearchResults>>(
      Path('v2/search/').url,
      headers,
      params
    ).then((response) => withGetNext(response));
