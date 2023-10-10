import { get, post } from '../../rest/BaseMethods.js';
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
  subscription_plan?: string;
  status?: string;
  created_at?: string;
}

export interface OptionsParams {
  actions: { POST: { [key: string]: ApiFormField } };
}

export interface OrganizationSubscriptionParams {
  assets_limit?: number;
  dashboards_limit?: number;
  files_limit?: number;
  secrets_limit?: number;
  components_limit?: number;
  integrations_limit?: number;
  functions_limit?: number;
  alerts_limit?: number;
  compute_slots?: number;
  datalake_gb?: number;
  end_date?: string | null;
}

export interface OrganizationCompute {
  id: string;
  region: string;
  status: string;
  kubeconfig_command: string;
  xlarge_nodes: number;
}

export interface OrganizationDatalake {
  id: string;
  status: string;
  size_in_gb: number;
}

export interface OrganizationStorage {
  id: string;
  size_in_gb: number;
}

export interface OrganizationDatabase {
  id: string;
  asset_limit: number;
  alert_limit: number;
  component_limit: number;
  dashboard_limit: number;
  file_limit: number;
  function_limit: number;
  integration_limit: number;
  secret_limit: number;
}

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
    compute: (orgId: string) =>
      get<OrganizationCompute>(
        organizationProfilesPath.slash(orgId).slash('compute').url,
        headers
      ),
    datalake: (orgId: string) =>
      get<OrganizationDatalake>(
        organizationProfilesPath.slash(orgId).slash('datalake').url,
        headers
      ),
    storage: (orgId: string) =>
      get<OrganizationStorage>(
        organizationProfilesPath.slash(orgId).slash('storage').url,
        headers
      ),
    database: (orgId: string) =>
      get<OrganizationDatabase>(
        organizationProfilesPath.slash(orgId).slash('database').url,
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
    reprovision: (orgId: string) =>
      post(
        organizationProfilesPath.slash(orgId).slash('reprovision').url,
        {},
        headers
      ),
  };
};

export const OrganizationsClient = (headers: Headers) => {
  const basePath = Path('v2/backoffice/organization/');
  return {
    profiles: OrganizationProfilesClient(basePath, headers),
  };
};
