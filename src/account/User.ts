import { get, patch } from '../rest/BaseMethods.js';
import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers, OrganizationProfile } from '../types.js';
import { Path } from '../Urls.js';

export interface Organization {
  id: string;
  name: string;
  display_name: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  effect: string;
  application: string;
  service: string;
  resource: string;
  actions: string[];
  is_system: boolean;
}

export type PermissionParams = Omit<Permission, 'id' | 'is_system'>;

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  is_system: boolean;
}

export type RoleParams = Omit<Role, 'id' | 'is_system'>;

export interface Action {
  name: string;
  display_name: string;
  description: string;
  generic: boolean;
}

export interface Service {
  name: string;
  actions: Action[];
}

export interface Application {
  name: string;
  services: Service[];
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
}

export type UserProfile = Required<UserProfileParams>;

export interface UserPermissions {
  permissions: string[];
}

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
      get<UserPermissions>(basePath.slash('permissions').url, headers),
    organizationProfile: () =>
      get<OrganizationProfile>(
        basePath.slash('organization-profile').url,
        headers
      ),
  };
};

export const PermissionsClient = (headers: Headers) => {
  const basePath = Path('v2/account/authorization/permissions/');
  const baseClient = BaseRestClient<PermissionParams, Permission>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    structure: () =>
      get<Application[]>(Path('v2/permission-structure').url, headers),
  };
};

export const RolesClient = (headers: Headers) => {
  const basePath = Path('v2/account/authorization/roles/');
  const baseClient = BaseRestClient<RoleParams, Role>(basePath, headers);
  return {
    ...baseClient,
    permissions: (pk: string) =>
      get<Permission[]>(basePath.slash(pk).slash('permissions').url, headers),
  };
};
