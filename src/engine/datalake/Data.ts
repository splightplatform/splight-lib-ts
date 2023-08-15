import { post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface SearchDataParams {
  from_timestamp: string;
  to_timestamp: string | null;
  traces: Array<{
    ref_id: string;
    type: string;
    expression?: string;
    pipeline?: string;
  }>;
}

export type SearchDataResponse = {
  timestamp: string;
  [key: string]: string | number;
  file: string;
}[];

export const DatalakeDataClient = (headers: Headers) => {
  const basePath = Path('v2/engine/datalake/data/');
  const baseClient = {
    ...BaseRestClient<SearchDataParams, SearchDataResponse>(basePath, headers),
    request: (data: SearchDataParams) =>
      post<SearchDataParams, SearchDataResponse>(
        basePath.slash('request').slash('json').url,
        data,
        headers
      ),
  };
  return baseClient;
};
