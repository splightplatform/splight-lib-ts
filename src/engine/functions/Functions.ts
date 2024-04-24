import { Path } from '../../Urls.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import {
  Headers,
  DataFlowGraph,
  DataRecord,
  Tag,
  PaginatedCollection,
} from '../../types.js';
import { get, post } from '../../rest/BaseMethods.js';

export interface FunctionItem {
  id?: string;
  query_filter_asset: {
    id: string;
    name: string;
    description: string;
  } | null;
  label: string;
  query_filter_attribute: {
    id: string;
    name: string;
  } | null;
  ref_id: string;
  type: 'QUERY' | 'EXPRESSION';
  expression: string;
  expression_plain: string;
  query_group_unit: string;
  query_group_function: string;
  query_sort_field: string;
  query_sort_direction: number;
  query_plain: string;
}

export interface FunctionsParams {
  collection?: string;
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
  time_window: number;
  target_variable: string;
  type: 'cron' | 'rate';
  active?: boolean;
  frequency?: number;
  tags?: Tag[];
}

export interface RateFunctionParams extends FunctionsParams {
  rate_unit: string;
  rate_value: number;
}

export interface CronFunctionParams extends FunctionsParams {
  cron_minutes: string;
  cron_hours: string;
  cron_dom: string;
  cron_month: string;
  cron_dow: string;
  cron_year: string;
}

export interface CronFunction extends CronFunctionParams {
  id: string;
  status: string;
}

export interface RateFunction extends RateFunctionParams {
  id: string;
  status: string;
}

export interface AsyncExecutionParams {
  from_date: string;
  to_date: string;
  type: string;
  cron_minutes?: string;
  cron_hours?: string;
  cron_dom?: string;
  cron_month?: string;
  cron_dow?: string;
  cron_year?: string;
  rate_value?: string;
  rate_unit?: string;
}

export type FunctionEvaluation = {
  timestamp: string;
  status: string;
  aggregation_value?: number;
};

export type FunctionEvent = {
  id: string;
  timestamp: string;
  old_status: string;
  new_status: string;
};

export const FunctionsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/function/functions/');
  const baseClient = BaseRestClient<
    CronFunctionParams | RateFunctionParams,
    CronFunction | RateFunction
  >(basePath, headers);

  return {
    ...baseClient,
    evaluations: async (
      pk: string,
      params?: {
        page_size?: number;
        since?: string;
        until?: string;
      }
    ) =>
      await get<PaginatedCollection<FunctionEvaluation>>(
        basePath.slash(pk).slash('evaluations').url,
        headers,
        params
      ),
    test: async (functionParams: Partial<FunctionsParams>) =>
      await post<Partial<FunctionsParams>, DataRecord[]>(
        basePath.slash('test').url,
        functionParams,
        headers
      ),
    dataFlow: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<DataFlowGraph>(
        basePath.slash(pk).slash('data-flow').url,
        headers,
        params
      ),
    futureExecutions: async (
      funcId: string,
      params: Partial<CronFunctionParams>
    ) =>
      post<Partial<CronFunctionParams>, string[]>(
        basePath.slash(funcId).slash('future-executions').url,
        params,
        headers
      ),
    asyncExecution: async (
      funcId: string,
      params: Partial<AsyncExecutionParams>
    ) =>
      post<Partial<AsyncExecutionParams>, string[]>(
        basePath.slash(funcId).slash('async-execution').url,
        params,
        headers
      ),
    planAsyncExecution: async (
      funcId: string,
      params: Partial<AsyncExecutionParams>
    ) =>
      post<Partial<AsyncExecutionParams>, string[]>(
        basePath.slash(funcId).slash('plan-async-execution').url,
        params,
        headers
      ),
    events: async (
      pk: string,
      params: Partial<{ page_size: number; page: number }>
    ) =>
      await get<{ results: FunctionEvent[]; next: string | null }>(
        basePath.slash(pk).slash('events').url,
        headers,
        ...[params]
      ),
  };
};
