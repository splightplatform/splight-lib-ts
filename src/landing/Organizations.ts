import { Path } from '../Urls.js';
import { options } from '../rest/BaseMethods.js';
import { BaseRestClient } from '../rest/BaseRestClient.js';
import { ApiFormField, Headers } from '../types.js';

export interface OrganizationRequest {
  name: string;
  email: string;
  company_name: string;
  message?: string;
  referred_by?: string;
}

export interface OptionsParams {
  actions: { POST: { [key: string]: ApiFormField } };
}

export const OrganizationRequestsClient = (
  basePath: Path,
  headers: Headers
) => {
  const requestPaths = basePath.slash('requests');
  const { create } = BaseRestClient<OrganizationRequest>(requestPaths, headers);
  return {
    create,
    fields: async () => await options<OptionsParams>(requestPaths.url, headers),
  };
};

export const OrganizationsClient = (headers: Headers) => {
  const basePath = Path('v2/landing/organization/');
  return {
    requests: OrganizationRequestsClient(basePath, headers),
  };
};
