import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import {
  ApiFormField,
  ExternalPortalLink,
  Headers,
  Subscription,
} from '../../types.js';
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
}

export interface OptionsParams {
  actions: { POST: { [key: string]: ApiFormField } };
}

export interface OrganizationSubscriptionParams {
  components_limit?: number;
  integrations_limit?: number;
  active_alerts?: number;
  compute_slots?: number;
  datalake_gb?: number;
  file_storage_gb?: number;
  end_date?: string | null;
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

export interface OrganizationDatalakeParams {
  size_in_gb: number;
}

export interface OrganizationDatalake extends OrganizationDatalakeParams {
  id: string;
  status: string;
}

export interface OrganizationAlertsParams {
  replicas: number;
}

export interface OrganizationAlerts extends OrganizationAlertsParams {
  id: string;
  status: string;
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
    setDatalake: (orgId: string, data: OrganizationDatalakeParams) =>
      post(
        organizationProfilesPath.slash(orgId).slash('datalake').url,
        data,
        headers
      ),
    datalake: (orgId: string) =>
      get<OrganizationDatalake>(
        organizationProfilesPath.slash(orgId).slash('datalake').url,
        headers
      ),
    setAlerts: (orgId: string, data: OrganizationAlertsParams) =>
      post(
        organizationProfilesPath.slash(orgId).slash('alerts').url,
        data,
        headers
      ),
    alerts: (orgId: string) =>
      get<OrganizationAlerts>(
        organizationProfilesPath.slash(orgId).slash('alerts').url,
        headers
      ),
    paymentsPortal: (orgId: string) =>
      get<ExternalPortalLink>(
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
  };
};
