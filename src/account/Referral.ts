import { Path } from '../Urls.js';
import { Headers } from '../types.js';
import { BaseRestClient } from '../rest/BaseRestClient.js';

export interface Referral {
  id: string;
  referred_by: string;
  referred: string;
  referred_name: string;
  date_created: string;
}

export const ReferralClient = (headers: Headers) => {
  const basePath = Path('v2/account/referral/');
  const { list } = BaseRestClient<Record<string, never>, Referral>(
    basePath,
    headers
  );

  return { list };
};
