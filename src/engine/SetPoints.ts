import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Asset, Attribute, Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface SetPoint {
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
  const baseClient = BaseRestClient<SetPoint, SetPoint>(basePath, headers);
  return baseClient;
};