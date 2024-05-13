import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface ReleasesParams {
  username?: string;
  is_splight_admin?: boolean;
  email?: string;
  id?: string;
  organizations_name?: string[];
  detail: string;
  title?: string;
}

export const ReleasesClient = (headers: Headers) => {
  const basePath = Path('v2/account/releases/');
  const baseClient = BaseRestClient<ReleasesParams>(basePath, headers);
  return baseClient;
};
