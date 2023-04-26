import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface UserActivity {
  id: string;
  organization_id: string;
  created_at: string;
  action: string;
  actor_type: string;
  actor_id: string;
  actor_name: string;
  actor_email: string;
  object_type: string;
  object_id: string;
  details: string;
}
export const ActivityClient = (headers: Headers) => {
  const basePath = Path('v2/account/activity/');
  const { list } = BaseRestClient<Record<string, never>, UserActivity>(
    basePath,
    headers
  );
  return {
    list,
  };
};
