import { get } from '../rest/BaseMethods.js';
import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers, OrganizationProfile } from '../types.js';
import { Path } from '../Urls.js';

export interface User {
  organization_id: string;
  original_organization_id: string;
  user_id: string;
  username: string;
  name: string;
  email: string;
  last_login: string;
  last_ip: string;
  logins_count: number;
  user_metadata: {
    picture_color: string;
    theme: string;
    language: string;
    timezone: string;
  };
  app_metadata: {
    is_manager: boolean;
  };
  picture: string;
  permissions: ('splightadmin' | 'admin' | 'editor')[];
  roles: string[];
}

export interface UserLogsDetails {
  ip: string;
  user_agent: string;
  location_info: Record<string, string>;
}

export interface UserLogs {
  id: string;
  action: string;
  type: string;
  date: string;
  details: UserLogsDetails;
}

export const UsersClient = (headers: Headers) => {
  const basePath = Path('v2/account/user/users/');
  const { list, update, retrieve, destroy } = BaseRestClient<User, User>(
    basePath,
    headers
  );
  return {
    list,
    update,
    retrieve,
    destroy,
    assignableRoles: (pk: string) =>
      get<string[]>(
        basePath.slash(pk).slash('assignable_roles', true).url,
        headers
      ),
    organizations: ({
      pk,
      ...params
    }: Record<string, string | number | boolean>) =>
      get<OrganizationProfile>(
        basePath.slash(pk as string).slash('organizations', true).url,
        headers,
        params
      ),
    logs: ({ pk, ...params }: Record<string, string | number | boolean>) =>
      get<{ results: UserLogs[]; next: string }>(
        basePath.slash(pk as string).slash('logs', true).url,
        headers,
        params
      ),
  };
};
