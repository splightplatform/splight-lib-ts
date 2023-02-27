import { BaseRestClient } from "../rest/BaseRestClient.js";
import { Headers } from "../types.js";
import { Path } from "../Urls.js";

export interface Organization {
  id: string;
  name: string;
  manager_email: string;
  payment_account_id: string;
  payout_account_id: string;
  blockchain_id: string;
}

export const OrganizationsClient = (headers: Headers) => {
  const basePath = Path("backoffice/organization/organizations/");
  const baseClient = BaseRestClient<Organization>(basePath, headers);
  return {
    list: () => baseClient.list(),
    retrieve: (pk: string) => baseClient.retrieve(pk),
    destroy: (pk: string) => baseClient.destroy(pk),
  };
};
