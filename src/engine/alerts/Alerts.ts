import { get, options, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import {
  ApiFormField,
  Asset,
  BaseRelatedAssetObj,
  DataRecord,
  Empty,
  Headers,
  Tag,
} from '../../types.js';
import { Path } from '../../Urls.js';

export type AlertItem = {
  id?: string;
  ref_id: string;
  type: 'QUERY' | 'EXPRESSION';
  label: string;
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
  status:
    | 'alert'
    | 'no_alert'
    | 'no_data'
    | 'timeout'
    | 'disabled'
    | 'error'
    | 'warning';
  status_text?: string | null;
};

export interface AlertParams {
  name: string;
  description?: string;
  severity:
    | 'sev1'
    | 'sev2'
    | 'sev3'
    | 'sev4'
    | 'sev5'
    | 'sev6'
    | 'sev7'
    | 'sev8';
  type: 'cron' | 'rate';
  status_text?: string;
  active?: boolean;
  collection?: string;
  stmt_frequency?: number; // TODO choices
  stmt_time_window: number;
  stmt_target_variable: string;
  stmt_operator: string;
  stmt_aggregation: string;
  stmt_thresholds: AlertThreshold[];
  alert_items: AlertItem[];
  assets?: Asset[];
  destinations_list: string[];
  custom_message: string | null;
  notify_no_data: boolean;
  notify_timeout: boolean;
  notify_error: boolean;
  tags?: Tag[];
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

export type CronAlert = CronAlertParams &
  BaseRelatedAssetObj & {
    id: string;
    status: string;
  };

export type RateAlert = RateAlertParams &
  BaseRelatedAssetObj & {
    id: string;
    status: string;
  };

export type AlertEvent = {
  id: string;
  timestamp: string;
  old_status: string;
  new_status: string;
  new_status_text?: string;
  old_status_text?: string;
};

export type AlertEvaluation = {
  timestamp: string;
  time_window: number;
  status: string;
  status_text?: string;
  aggregation_value?: number;
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
    evaluations: async (
      pk: string,
      params?: {
        since?: string;
        until?: string;
      }
    ) =>
      await get<AlertEvaluation[]>(
        basePath.slash(pk).slash('evaluations').url,
        headers,
        params
      ),
    test: async (alertParams: Partial<AlertParams>) =>
      await post<Partial<AlertParams>, DataRecord[]>(
        basePath.slash('test').url,
        alertParams,
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
