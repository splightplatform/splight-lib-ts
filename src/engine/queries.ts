import { get, post } from "../rest/base-methods.js";
import { BaseRestClient } from "../rest/base-rest-client.js";
import { Headers } from "../types.js";
import { Path } from "../urls.js";

// This name is a bit confusing, How could I make it less confusing without breaking
// the Resource ResourceParams pattern?
export interface QueryParams {
  source_type: string;
  name: string;
  description?: string;
  output_format: string;
  target: string;
  source_component_id: string | null;
  source_component_label: string | null;
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
  source_type: string;
  name: string;
  description: string;
  output_format: string;
  target: string;
  source_component_id: string | null;
  source_component_label: string | null;
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

export const QueriesClient = (headers: Headers) => {
  const basePath = Path("engine/queries/");

  const getParams = async (query: QueryParams) => {
    const { query_params } = await post<QueryParams, { query_params: string }>(
      basePath.slash("get_query_params").url,
      query,
      headers
    );
    return query_params;
  };

  const baseClient = BaseRestClient<QueryParams, Query>(basePath, headers);
  return {
    ...baseClient,
    // We should have a type for the results
    execute: async (query: QueryParams) => {
      const params = await getParams(query);
      const datalake_path = Path("engine/datalake/");
      const { results } = await get<{ results: any }>(
        datalake_path.slash(params).url,
        headers
      );
      return results;
    },
  };
};
