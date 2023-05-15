import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface SearchDataParams {
  asset: string;
  attribute: string;
  output_format: number;
  group_id: string;
  group_fields: string;
  timestamp__gte: string;
  project_fields: string;
  source: string;
}

export type SearchDataResponse = {
  asset_id: string;
  attribute_id: string;
  path: string;
  timestamp: string;
  [key: string]: string | number;
};

export const DatalakeDataClient = (headers: Headers) => {
  const basePath = Path('v2/engine/datalake/data');
  const baseClient = BaseRestClient<SearchDataParams, SearchDataResponse>(
    basePath,
    headers
  );
  return baseClient;
};
