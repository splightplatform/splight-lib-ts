import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface AlertParams {
  name: string;
  description?: string;
}

interface DataAddress { 
  type: 'DataAddress';
  name: string;
  value: {
    asset: string;
    attribute: string;
  }
}

interface MathItem {
  type: 'MathItem';
  name: string;
  value: string;
}

type Variable = DataAddress | MathItem;

interface Condition {
  id: string;
  name: string;
  type: string;
  variables: Variable[];
  left_operand: string;
  operator: string;
  right_operand: string;
}

export interface Alert extends AlertParams {
  id: string;
  message: string;
  period: number;
  notification_emails: string[];
  status: string;
  active: boolean;
  conditions: Condition[];
}

export const AlertsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/alert/alerts/');
  const baseClient = BaseRestClient<AlertParams, Alert>(
    basePath,
    headers
  );
  return baseClient;
};
