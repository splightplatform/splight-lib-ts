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

export interface SetPointParams {
  type: string;
  value: string;
  attribute: string;
  asset: string;
}

export const SetPointsClient = (headers: Headers) => {
  // cspell:disable-next-line
  const basePath = Path('v2/engine/setpoints/');
  const baseClient = BaseRestClient<SetPointParams, SetPoint>(
    basePath,
    headers
  );
  return baseClient;
};
