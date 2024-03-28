import { Blob } from 'buffer';
import { post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export type DataRecord = {
  timestamp: string;
  [key: string]: string | number;
};

export interface DataRequest {
  from_timestamp: string | null;
  to_timestamp: string | null;
  sort_direction: number | null;
  collection: string | null;
  traces: Array<{
    ref_id: string;
    type: string;
    expression: string | null;
    pipeline: string | null;
  }>;
  aggregation?: string | null;
}

export type DataRecords = {
  collection: string;
  records: DataRecord[];
};

export const DatalakeDataClient = (headers: Headers) => {
  const basePath = Path('data');
  const baseClient = {
    ...BaseRestClient<DataRequest, DataRecord[]>(basePath, headers),
    read: (request: DataRequest) =>
      post<DataRequest, DataRecord[]>(
        basePath.slash('read', false).url,
        request,
        headers
      ),
    write: (records: DataRecords) =>
      post<DataRecords, Blob>(
        basePath.slash('write', false).url,
        records,
        headers,
        {},
        'blob'
      ),
  };
  return baseClient;
};
