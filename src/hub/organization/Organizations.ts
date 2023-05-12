// Organizations

import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface Organization {
  id: string;
  name: string;
}

export const OrganizationsClient = (headers: Headers) => {
  const basePath = Path('v2/hub/organization/organizations/');

  const { list, retrieve } = BaseRestClient<Organization, Organization>(
    basePath,
    headers
  );
  return {
    list,
    retrieve,
  };
};
