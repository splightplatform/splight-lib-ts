import {
  OrganizationsClient,
  ContractsClient,
  AssetsClient,
  ComputeNodeClient,
} from './backoffice/index.js';
import { Headers } from './types.js';

export const Backoffice = (headers: Headers) => ({
  organizations: OrganizationsClient(headers),
  contracts: ContractsClient(headers),
  computeNode: ComputeNodeClient(headers),
  assets: AssetsClient(headers),
});
