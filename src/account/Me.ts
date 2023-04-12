import { get } from '../rest/BaseMethods.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface Organization {
  id: string;
  name: string;
  display_name: string;
}

export type OrganizationParams = Omit<Organization, 'id'>;

export const MeClient = (headers: Headers) => {
  const basePath = Path('v2/account/user/me/');
  return {
    profile: () => get(basePath.url, headers),
    permissions: () => get(basePath.slash('permissions').url, headers),
    organizations: () =>
      get<Organization[]>(Path('v2/account/user/organizations/').url, headers),
  };
};
