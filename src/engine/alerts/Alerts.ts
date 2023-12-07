import { options, get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { ApiFormField, Asset, Empty, Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export type AlertItem = {
  id?: string;
  ref_id: string;
  type: 'QUERY' | 'EXPRESSION';
  expression: string;
  expression_plain: string | null;
  query_filter_asset: {
    id: string;
    name?: string;
  } | null;
  query_filter_attribute: {
    id: string;
    name?: string;
  } | null;
  query_group_unit: string;
  query_group_function: string;
  query_sort_field: string;
  query_sort_direction: number;
  query_limit: number;
  query_plain: string | null;
};

export type AlertThreshold = {
  value: number;
  desired_status: string; // TODO choices
};

export interface AlertParams {
  name: string;
  description?: string;
  severity: string; // TODO choices
  type: 'cron' | 'rate';
  stmt_frequency?: number; // TODO choices
  stmt_time_window: number;
  stmt_target_variable: string;
  stmt_operator: string;
  stmt_aggregation: string;
  stmt_thresholds: AlertThreshold[];
  alert_items: AlertItem[];
  assets?: Asset[];
}

export interface RateAlertParams extends AlertParams {
  rate_unit: string;
  rate_value: number;
}

export interface CronAlertParams extends AlertParams {
  cron_minutes: string;
  cron_hours: string;
  cron_dom: string;
  cron_month: string;
  cron_dow: string;
  cron_year: string;
}

export type CronAlert = CronAlertParams & {
  id: string;
  status: string;
};

export type RateAlert = RateAlertParams & {
  id: string;
  status: string;
};

export type AlertEvent = {
  id: string;
  timestamp: string;
  old_status: string;
  new_status: string;
};

export type AlertEvaluation = {
  timestamp: string;
  time_window: number;
  value: string;
};

export const AlertsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/alert/alerts/');
  const baseClient = BaseRestClient<
    CronAlertParams | RateAlertParams,
    CronAlert | RateAlert
  >(basePath, headers);
  return {
    ...baseClient,
    options: async () =>
      await options<{ actions: { POST: { [key: string]: ApiFormField } } }>(
        basePath.url,
        headers
      ),
    events: async (
      pk: string,
      params: Partial<{ page_size: number; page: number }>
    ) =>
      await get<{ results: AlertEvent[]; next: string | null }>(
        basePath.slash(pk).slash('events').url,
        headers,
        ...[params]
      ),
    evaluations: async (pk: string) =>
      await get<AlertEvaluation[]>(
        basePath.slash(pk).slash('evaluations').url,
        headers
      ),
    evaluate: async (pk: string) =>
      post<Empty, Empty>(basePath.slash(pk).slash('evaluate').url, {}, headers),
  };
};

export const AlertEventsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/alert/events/');
  const baseClient = BaseRestClient<AlertEvent, AlertEvent>(basePath, headers);

  return baseClient;
};
