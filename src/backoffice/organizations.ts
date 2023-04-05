import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface OrganizationProfile {
  id: string;
  name: string;
  manager_email: string;
  payment_account_id: string;
  payout_account_id: string;
  blockchain_id: string;
  subscription_plan: string;
}

export const OrganizationsClient = (headers: Headers) => {
  const basePath = Path('backoffice/organization/organizations/');
  const baseClient = BaseRestClient<OrganizationProfile>(basePath, headers);
  return baseClient;
};
