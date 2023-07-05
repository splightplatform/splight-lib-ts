import {
  OrganizationsClient,
  AgreementsClient,
  AssetsClient,
} from './backoffice/index.js';
import { Headers } from './types.js';

export const Backoffice = (headers: Headers) => ({
  organizations: OrganizationsClient(headers),
  agreements: AgreementsClient(headers),
  assets: AssetsClient(headers),
});
