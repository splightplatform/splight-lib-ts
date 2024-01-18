import { get, patch } from '../rest/BaseMethods.js';
import { Role, Permission } from './Roles.js';
import { Headers, OrganizationProfile } from '../types.js';
import { Path } from '../Urls.js';

export interface Organization {
  id: string;
  name: string;
  display_name: string;
}

export interface UserProfileParams {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  language?: string;
  theme?: string;
  picture_color?: string;
  timezone?: string;
  tour_progress?: number;
  enable_email_notifications?: boolean;
  enable_push_notifications?: boolean;
  enable_sms_notifications?: boolean;
  enable_web_notifications?: boolean;
  roles?: Role[];
  permissions?: Permission[];
}

export type UserProfile = Required<UserProfileParams> & {
  user_id?: string;
  organization_id?: string;
  original_organization_id?: string;
  is_splight_admin?: boolean;
};

export type OrganizationParams = Omit<Organization, 'id'>;

export const UserClient = (headers: Headers) => {
  const basePath = Path('v2/account/user/');
  return {
    profile: () => ({
      get: () => get<UserProfile>(basePath.slash('profile').url, headers),
      update: (data: UserProfileParams) =>
        patch<UserProfileParams, UserProfile>(
          basePath.slash('profile').slash('edit').url,
          data,
          headers
        ),
    }),
    permissions: () =>
      get<Permission[]>(basePath.slash('permissions').url, headers),
    organizationProfile: () => ({
      get: () =>
        get<OrganizationProfile>(
          basePath.slash('organization-profile').url,
          headers
        ),
      uploadLogo: (logo: File) =>
        patch<{ logo: File }, { logo: string }>(
          basePath.slash('organization-profile').slash('upload-logo').url,
          { logo },
          headers
        ),
    }),
  };
};
