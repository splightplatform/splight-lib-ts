import { get, post } from "../rest/BaseMethods.js";
import { BaseRestClient } from "../rest/BaseRestClient.js";
import { Headers, PaginatedCollection } from "../types.js";
import { Path } from "../Urls.js";

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
  output_format: "Number" | "Boolean" | "String"; //TODO: Add remaining types;
  filters?: { [key: string]: string };
  target: string;
  source_type: "Native" | "Component";
  limit?: number;
}

export const QueriesClient = (headers: Headers) => {
  const basePath = Path("engine/queries/");
  const baseClient = BaseRestClient<QueryParams, Query>(basePath, headers);

  const getParams = async (query: AnonymousQuery) => {
    console.log(basePath.slash("get_query_params").url);
    const { query_params } = await post<
      AnonymousQuery & { name: string },
      { query_params: string }
    >(
      basePath.slash("get_query_params").url,
      { ...query, name: "default" },
      headers
    );
    return query_params;
  };

  return {
    ...baseClient,
    //Is returning the datalake as JSON good enough?
    execute: async (query: AnonymousQuery) => {
      const params = await getParams(query);
      const datalake_path = Path("engine/datalake/data/");
      return await get<PaginatedCollection<JSON>>(
        datalake_path.slash(params).url,
        headers
      );
    },
  };
};
