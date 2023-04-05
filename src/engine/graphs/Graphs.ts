import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export type Graph = {
  id: string;
  title: string;
  description: string;
};

export interface GraphParams {
  title: string;
  description?: string;
}

export const GraphsClient = (headers: Headers) => {
  const basePath = Path('engine/graph/graphs/');
  const baseClient = BaseRestClient<GraphParams, Graph>(basePath, headers);
  return baseClient;
};
