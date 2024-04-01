import { get } from '../rest/BaseMethods.js';
import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';
import { Role } from './Roles.js';

export interface OrganizationProfileParams {
  name: string;
  manager_email?: string;
  payment_account_id?: string;
  payout_account_id?: string;
  logo?: string;
}

export interface OrganizationProfile extends OrganizationProfileParams {
  id: string;
  logo_thumbnail?: string;
  subscription_plan?: string;
  status?: string;
  created_at?: string;
}

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
  picture: string;
  roles: Role[];
  sso_roles: Role[];
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
    logs: ({ pk, ...params }: Record<string, string | number | boolean>) =>
      get<{ results: UserLogs[]; next: string; count: number }>(
        basePath.slash(pk as string).slash('logs', true).url,
        headers,
        params
      ),
  };
};
