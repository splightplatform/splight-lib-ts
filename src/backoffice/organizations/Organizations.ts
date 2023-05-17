import { get, options, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { ApiFormField, Headers, Subscription } from '../../types.js';
import { Path } from '../../Urls.js';

export interface OrganizationProfileParams {
  name: string;
  manager_email?: string;
  payment_account_id?: string;
  payout_account_id?: string;
}

export interface OrganizationProfile extends OrganizationProfileParams {
  id: string;
  blockchain_id?: string;
  subscription_plan?: string;
  status?: string;
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

export interface OptionsParams {
  actions: { POST: { [key: string]: ApiFormField } };
}

export interface OrganizationSubscriptionParams {
  subscription_plan: string;
}

export interface OrganizationComputeParams {
  xlarge_nodes: number;
}

export interface OrganizationCompute extends OrganizationComputeParams {
  id: string;
  region: string;
  status: string;
  kubeconfig_command: string;
}

export const OrganizationRequestsClient = (
  basePath: Path,
  headers: Headers
) => {
  const requestPaths = basePath.slash('requests');
  const baseClient = BaseRestClient<OrganizationRequest>(requestPaths, headers);
  return {
    ...baseClient,
    fields: async () => await options<OptionsParams>(requestPaths.url, headers),
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
    setSubscription: (orgId: string, data: OrganizationSubscriptionParams) =>
      post(
        organizationProfilesPath.slash(orgId).slash('subscription').url,
        data,
        headers
      ),
    subscription: (orgId: string) =>
      get<Subscription>(
        organizationProfilesPath.slash(orgId).slash('subscription').url,
        headers
      ),
    setCompute: (orgId: string, data: OrganizationComputeParams) =>
      post(
        organizationProfilesPath.slash(orgId).slash('compute').url,
        data,
        headers
      ),
    compute: (orgId: string) =>
      get<OrganizationCompute>(
        organizationProfilesPath.slash(orgId).slash('compute').url,
        headers
      ),
    paymentsPortal: (orgId: string) =>
      get(
        organizationProfilesPath.slash(orgId).slash('payments_portal').url,
        headers
      ),
    activate: (orgId: string) =>
      post(
        organizationProfilesPath.slash(orgId).slash('activate').url,
        {},
        headers
      ),
    deactivate: (orgId: string) =>
      post(
        organizationProfilesPath.slash(orgId).slash('deactivate').url,
        {},
        headers
      ),
  };
};

export const OrganizationsClient = (headers: Headers) => {
  const basePath = Path('v2/backoffice/organization/');
  return {
    profiles: OrganizationProfilesClient(basePath, headers),
    requests: OrganizationRequestsClient(basePath, headers),
  };
};
