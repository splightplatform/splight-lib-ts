import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface Feature {
  id: string;
  name: string;
  organization_name: string;
  namespace: string;
}

export const FeaturesClient = (headers: Headers) => {
  const basePath = Path('v2/backoffice/features/');
  const baseClient = BaseRestClient<Feature, Feature>(basePath, headers);
  return baseClient;
};
