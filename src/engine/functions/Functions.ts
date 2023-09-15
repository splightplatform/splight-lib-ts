import { Path } from '../../Urls.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { get } from '../../rest/BaseMethods.js';

export interface FunctionItem {
  id?: string;
  query_filter_asset: {
    id: string;
    name: string;
    description: string;
  } | null;
  query_filter_attribute: {
    id: string;
    name: string;
  } | null;
  ref_id: string;
  type: string;
  expression: string;
  expression_plain: string;
  query_group_unit: string;
  query_group_function: string;
  query_sort_field: string;
  query_sort_direction: number;
  query_plain: string;
}

export interface FunctionsParams {
  function_items: FunctionItem[];
  target_asset: {
    id: string;
    name?: string;
    description?: string;
  };
  target_attribute: {
    id: string;
    name?: string;
  };
  name: string;
  description: string;
  frequency: number;
  time_window: number;
  target_variable: string;
}
export interface Functions extends FunctionsParams {
  id: string;
  deleted: boolean;
  active: boolean;
}

export type FunctionEvaluation = {
  timestamp: string;
  status: string;
};

export const FunctionsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/function/functions/');
  const baseClient = BaseRestClient<FunctionsParams, Functions>(
    basePath,
    headers
  );

  return {
    ...baseClient,
    evaluations: async (pk: string) =>
      await get<FunctionEvaluation[]>(
        basePath.slash(pk).slash('evaluations').url,
        headers
      ),
  };
};
