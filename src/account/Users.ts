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
  user_metadata: {
    picture_color: string;
    theme: string;
    language: string;
  };
  app_metadata: {
    is_manager: boolean;
  };
  picture: string;
  // cspell:disable-next-line
  permissions: ('splightadmin' | 'admin' | 'editor')[];
  roles: string[];
}

export const UsersClient = (headers: Headers) => {
  const basePath = Path('v2/account/user/users/');
  const { list } = BaseRestClient<User, User>(basePath, headers);
  return {
    list,
    organizations: ({
      pk,
      ...params
    }: {
      pk: string & Record<string, string | number | boolean>;
    }) =>
      get<OrganizationProfile>(
        basePath.slash(pk).slash('organizations', true).url,
        headers,
        params
      ),
  };
};
