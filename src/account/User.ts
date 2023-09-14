import { get, patch } from '../rest/BaseMethods.js';
import { Headers, OrganizationProfile } from '../types.js';
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
  timezone: string;
  enable_email_notifications: boolean;
  enable_push_notifications: boolean;
  enable_sms_notifications: boolean;
  enable_web_notifications: boolean;
}

export interface UserPermissions {
  permissions: string[];
}

export type OrganizationParams = Omit<Organization, 'id'>;

export const UserClient = (headers: Headers) => {
  const basePath = Path('v2/account/user/');
  return {
    profile: () => ({
      get: () => get<UserProfile>(basePath.slash('profile').url, headers),
      update: (data: UserProfile) =>
        patch<UserProfile, UserProfile>(
          basePath.slash('profile').slash('edit').url,
          data,
          headers
        ),
    }),
    permissions: () =>
      get<UserPermissions>(basePath.slash('permissions').url, headers),
    organizationProfile: () =>
      get<OrganizationProfile>(
        basePath.slash('organization-profile').url,
        headers
      ),
  };
};
