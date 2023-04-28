import { options, post } from '../rest/BaseMethods.js';
import { BaseRestClient } from '../rest/BaseRestClient.js';
import { ApiFormField, Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface OrganizationRequestParams {
  name: string;
  email: string;
  company_name: string;
  country: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  message?: string;
  referred_by?: string;
}

export interface OrganizationRequest extends OrganizationRequestParams {
  id: string;
  created_at: string;
  updated_at: string;
  referred_by: string;
}

export const OrganizationRequestsClient = (headers: Headers) => {
  const basePath = Path('v2/backoffice/organization/requests/');
  const baseClient = BaseRestClient<OrganizationRequest>(basePath, headers);
  return {
    ...baseClient,
    fields: async () =>
      (
        await options<{ actions: { POST: { [key: string]: ApiFormField } } }>(
          basePath.url,
          headers
        )
      ).actions.POST,
    activate: (pk: string): Promise<void> =>
      post(basePath.slash(pk).slash('activate').url, {}, headers),
  };
};
