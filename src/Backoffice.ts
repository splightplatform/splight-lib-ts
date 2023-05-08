import {
  OrganizationsClient,
  AgreementsClient,
  BillingClient,
  AssetsClient,
} from './backoffice/index.js';
import { Headers } from './types.js';

export const Backoffice = (headers: Headers) => ({
  organizations: OrganizationsClient(headers),
  agreements: AgreementsClient(headers),
  billing: BillingClient(headers),
  assets: AssetsClient(headers),
});
