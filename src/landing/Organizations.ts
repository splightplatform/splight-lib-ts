import { Headers } from '../types.js';
import { Path } from '../Urls.js';
import { post } from '../rest/BaseMethods.js';

export interface OrganizationRequest {
  name: string;
  email: string;
  company_name: string;
  message?: string;
  referred_by?: string;
}

export const OrganizationRequestsClient = <
  I,
  O = I,
  Q extends Record<string, string | number | boolean | undefined> = Record<
    string,
    string | number | boolean | undefined
  >
>(
  basePath: Path,
  headers: Headers
) => {
  const requestPaths = basePath.slash('requests');
  return {
    create: (data: I, params?: Q): Promise<O> =>
      post(requestPaths.url, data, headers, ...[params]),
  };
};

export const OrganizationsClient = (headers: Headers) => {
  const basePath = Path('v2/landing/organization/');
  return {
    requests: OrganizationRequestsClient(basePath, headers),
  };
};
