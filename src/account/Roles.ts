import { get } from '../rest/BaseMethods.js';
import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';
import { Tag } from './Tags.js';
export interface Permission {
  id: string;
  name: string;
  description: string;
  effect: string;
  application: string;
  service: string;
  resource: string;
  actions: string[];
  tags: Tag[];
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

export interface SsoRoleMapping {
  id: string;
  name: string;
  description: string;
  roles: Role[];
  sso_role: string;
}
export type SsoRoleMappingParams = Omit<SsoRoleMapping, 'id'>;

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

export const SsoRoleMappingsClient = (headers: Headers) => {
  const basePath = Path('v2/account/authorization/sso-role-mappings/');
  const baseClient = BaseRestClient<SsoRoleMappingParams, SsoRoleMapping>(
    basePath,
    headers
  );
  return {
    ...baseClient,
  };
};
