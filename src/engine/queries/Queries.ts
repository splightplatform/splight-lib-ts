import { post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, PaginatedCollection } from '../../types.js';
import { Path } from '../../Urls.js';

// This name is a bit confusing, How could I make it less confusing without breaking
// the Resource ResourceParams pattern?
export interface QueryParams {
  source_type: string;
  name: string;
  description?: string;
  output_format: string;
  target: string;
  source_component_id?: string | null;
  source_component_label?: string | null;
  filters: { [key: string]: string };
  limit?: number;
  skip?: number;
  source?: string;
  sort?: string;
  add_fields?: string;
  group_id?: string;
  group_fields?: string;
  rename_fields?: string;
  project_fields?: string;
  timezone_offset?: number;
  query_params?: string;
}

export interface Query extends QueryParams {
  id: string;
  source_type: string;
  name: string;
  description: string;
  output_format: string;
  target: string;
  source_component_id?: string | null;
  source_component_label?: string | null;
  filters: { [key: string]: string };
  limit?: number;
  skip?: number;
  source?: string;
  sort?: string;
  add_fields?: string;
  group_id?: string;
  group_fields?: string;
  rename_fields?: string;
  project_fields?: string;
  timezone_offset?: number;
  query_params?: string;
}

export interface AnonymousQuery {
  output_format: 'Number' | 'Boolean' | 'String'; //TODO: Add remaining types;
  filters?: { [key: string]: string };
  target: string;
  source_type: 'Native' | 'Component';
  limit?: number;
}

export const QueriesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/queries/');
  const baseClient = BaseRestClient<QueryParams, Query>(basePath, headers);

  return {
    ...baseClient,
    //Is returning the datalake data as JSON good enough?
    execute: async (query: AnonymousQuery) => {
      const datalake_path = Path('v2/engine/datalake/data/execute_query/');
      return await post<AnonymousQuery, PaginatedCollection<JSON>>(
        datalake_path.url,
        query,
        headers
      );
    },
  };
};
