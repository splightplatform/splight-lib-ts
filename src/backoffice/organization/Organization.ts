import { options, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { ApiFormField, Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface OrganizationProfile {
  id: string;
  name: string;
  manager_email: string;
  payment_account_id: string;
  payout_account_id: string;
  blockchain_id: string;
  subscription_plan: string;
}

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

export const OrganizationRequestsClient = (
  basePath: Path,
  headers: Headers
) => {
  const requestPaths = basePath.slash('requests');
  const baseClient = BaseRestClient<OrganizationRequest>(requestPaths, headers);
  return {
    ...baseClient,
    fields: async () =>
      await options<{ actions: { POST: { [key: string]: ApiFormField } } }>(
        requestPaths.url,
        headers
      ),
    activate: (pk: string): Promise<void> =>
      post(requestPaths.slash(pk).slash('activate').url, {}, headers),
  };
};

export const OrganizationProfilesClient = (
  basePath: Path,
  headers: Headers
) => {
  const organizationProfilesPath = basePath.slash('profiles');
  const baseClient = BaseRestClient<OrganizationProfile>(
    organizationProfilesPath,
    headers
  );

  return {
    ...baseClient,
    subscribe: (orgId: string) =>
      post(
        organizationProfilesPath.slash(orgId).slash('subscribe').url,
        {},
        headers
      ),
    unsubscribe: (orgId: string) =>
      post(
        organizationProfilesPath.slash(orgId).slash('unsubscribe').url,
        {},
        headers
      ),
    setOrganizationManager: (orgId: string) =>
      post(
        organizationProfilesPath.slash(orgId).slash('set_organization_manager')
          .url,
        {},
        headers
      ),
  };
};

export const OrganizationClient = (headers: Headers) => {
  const basePath = Path('v2/backoffice/organization/');
  return {
    profiles: OrganizationProfilesClient(basePath, headers),
    requests: OrganizationRequestsClient(basePath, headers),
  };
};