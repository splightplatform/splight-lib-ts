import { Path } from '../Urls.js';
import { get } from '../rest/BaseMethods.js';
import { Headers } from '../types.js';

export type ItemProvisionDataName =
  | 'Datalake'
  | 'Compute'
  | 'Alert'
  | 'Component'
  | 'Logs'
  | 'Storage'
  | 'Integrations'
  | 'Asset'
  | 'Function'
  | 'Secret'
  | 'Dashboard';

export type ItemProvisionData = {
  name: ItemProvisionDataName;
  limit: number;
  used: number;
  unit?: string;
};

export type ProvisionData = ItemProvisionData[];

export const ProvisionClient = (headers: Headers) => {
  const basePath = Path('v2/account/provision/');

  const computeUsage = basePath.slash('compute/usage');
  const datalakeUsage = basePath.slash('datalake/usage');
  const databaseUsage = basePath.slash('database/usage');
  const fileStorageUsage = basePath.slash('file-storage/usage');

  return {
    computeUsage: () => get<ProvisionData>(computeUsage.url, headers),
    datalakeUsage: () => get<ProvisionData>(datalakeUsage.url, headers),
    databaseUsage: () => get<ProvisionData>(databaseUsage.url, headers),
    fileStorageUsage: () => get<ProvisionData>(fileStorageUsage.url, headers),
  };
};
