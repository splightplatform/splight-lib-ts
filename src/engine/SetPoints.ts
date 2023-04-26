import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Asset, Attribute, Headers } from '../types.js';
import { Path } from '../Urls.js';

// cspell:disable-next-line
export interface Setpoint {
  id: string;
  type: string;
  value: string;
  asset: Asset;
  attribute: Attribute;
  created_at: string;
}

export const SetPointsClient = (headers: Headers) => {
  // cspell:disable-next-line
  const basePath = Path('v2/engine/setpoints/');
  // cspell:disable-next-line
  const baseClient = BaseRestClient<Setpoint, Setpoint>(basePath, headers);
  return baseClient;
};
