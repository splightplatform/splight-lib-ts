import { get } from '../rest/BaseMethods.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface Organization {
  id: string;
  name: string;
  display_name: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  language: string;
  theme: string;
  picture_color: string;
  enable_email_notifications: boolean;
  enable_push_notifications: boolean;
  enable_sms_notifications: boolean;
  enable_web_notifications: boolean;
}

export interface UserPermissions {
  permissions: string[];
}

export type OrganizationParams = Omit<Organization, 'id'>;

export const MeClient = (headers: Headers) => {
  const basePath = Path('v2/account/user/me/');
  return {
    profile: () => get<UserProfile>(basePath.url, headers),
    permissions: () =>
      get<UserPermissions>(basePath.slash('permissions').url, headers),
    organizations: () =>
      get<Organization[]>(Path('v2/account/user/organizations/').url, headers),
  };
};
