import {
  OrganizationRequestsClient,
  OrganizationsClient,
  AgreemetsClient,
  BillingClient,
} from "./backoffice/index.js";
import { Headers } from "./types.js";

export const Backoffice = (headers: Headers) => ({
  organizations: OrganizationsClient(headers),
  organizationRequests: OrganizationRequestsClient(headers),
  agreements: AgreemetsClient(headers),
  billing: BillingClient(headers),
});
