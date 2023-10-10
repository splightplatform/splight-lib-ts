import {
  OrganizationsClient,
  ContractsClient,
  AssetsClient,
  ComputeNodesClient,
  FeaturesClient,
} from './backoffice/index.js';
import { Headers } from './types.js';

export const Backoffice = (headers: Headers) => ({
  organizations: OrganizationsClient(headers),
  contracts: ContractsClient(headers),
  features: FeaturesClient(headers),
  computeNodes: ComputeNodesClient(headers),
  assets: AssetsClient(headers),
});
