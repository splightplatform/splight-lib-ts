import { options, get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { ApiFormField, Asset, Attribute, Empty, Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface DataAddress {
  type: 'DataAddress';
  name: string;
  value: {
    asset: string;
    attribute: string;
  };
}

export type PopulatedDataAddress = DataAddress & {
  value: {
    asset: Asset;
    attribute: Attribute;
  };
};

export interface MathItem {
  type: 'MathItem';
  name: string;
  value: string;
}

export type Variable = DataAddress | MathItem;
export type PopulatedVariable = PopulatedDataAddress | MathItem;

export interface Condition {
  id: string;
  name: string;
  type: string;
  variables: Variable[];
  left_operand: string;
  operator: string;
  right_operand: string;
  populated_variables?: PopulatedVariable[];
}

export interface AlertParams {
  name: string;
  description?: string;
  message?: string;
  period?: number;
  max_backward_seconds?: number;
  status?: string;
  active?: boolean;
  conditions?: Condition[];
  severity?: string;
}

export type Alert = AlertParams & {
  id: string;
  description: string;
  message: string;
  period: number;
  max_backward_seconds: number;
  status: string;
  active: boolean;
  conditions: Condition[];
  severity: string;
};

export type AlertHistory = {
  id: string;
  timestamp: string;
  status: string;
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
    history: async (pk: string) =>
      await get<{ results: AlertHistory[]; next: string | null }>(
        basePath.slash(pk).slash('history').url,
        headers
      ),
    test: async (pk: string) =>
      post<Record<string, never>, Empty>(
        basePath.slash(pk).slash('test').url,
        {},
        headers
      ),
  };
};
