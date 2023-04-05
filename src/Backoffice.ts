import {
  OrganizationRequestsClient,
  OrganizationsClient,
  AgreementsClient,
  BillingClient,
} from "./backoffice/index.js";
import { Headers } from "./types.js";

export const Backoffice = (headers: Headers) => ({
  organizations: OrganizationsClient(headers),
  organizationRequests: OrganizationRequestsClient(headers),
  agreements: AgreementsClient(headers),
  billing: BillingClient(headers),
});
