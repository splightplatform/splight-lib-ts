import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Asset, Attribute, Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface Setpoint {
  id: string;
  type: string;
  value: string;
  asset: Asset;
  attribute: Attribute;
  created_at: string;
}

export const SetPointsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/setpoints/');
  const baseClient = BaseRestClient<Setpoint, Setpoint>(basePath, headers);
  return baseClient;
};
