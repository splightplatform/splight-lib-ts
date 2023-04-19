import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface DataAddress {
  type: 'DataAddress';
  name: string;
  value: {
    asset: string;
    attribute: string;
  };
}

export interface MathItem {
  type: 'MathItem';
  name: string;
  value: string;
}

export type Variable = DataAddress | MathItem;

export interface Condition {
  id: string;
  name: string;
  type: string;
  variables: Variable[];
  left_operand: string;
  operator: string;
  right_operand: string;
}

export interface AlertParams {
  name: string;
  description?: string;
  message?: string;
  period?: number;
  notification_emails?: string[];
  status?: string;
  active?: boolean;
  conditions?: Condition[];
}

export type Alert = AlertParams & {
  id: string;
  description: string;
  message: string;
  period: number;
  notification_emails: string[];
  status: string;
  active: boolean;
  conditions: Condition[];
};

export const AlertsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/alert/alerts/');
  const baseClient = BaseRestClient<AlertParams, Alert>(basePath, headers);
  return baseClient;
};
