import { options, get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { ApiFormField, Empty, Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export type AlertItem = {
  id?: string;
  ref_id: string;
  type: string;
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

export interface AlertParams {
  name: string;
  description?: string;
  severity: string; // TODO choices
  stmt_frequency: number; // TODO choices
  stmt_time_window: number;
  stmt_target_variable: string;
  stmt_operator: string; // TODO choices
  stmt_threshold: number;
  alert_items: AlertItem[];
}

export type Alert = AlertParams & {
  id: string;
  description: string;
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
  const baseClient = BaseRestClient<AlertParams, Alert>(basePath, headers);
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
