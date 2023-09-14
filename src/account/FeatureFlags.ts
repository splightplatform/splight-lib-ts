import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export const FeatureFlagsClient = (headers: Headers) => {
  const basePath = Path('v2/account/feature_flags/');
  const { list } = BaseRestClient<string[]>(
    basePath,
    headers
  );
  return {
    list,
  };
};
