import { Path } from '../Urls.js';
import { Headers } from '../types.js';
import { BaseRestClient } from '../rest/BaseRestClient.js';
import { OrganizationProfile } from '../types.js';

export interface Referral {
  id: string;
  referred_by: OrganizationProfile;
  referred: OrganizationProfile;
  date_created: string;
}

export const ReferralClient = (headers: Headers) => {
  const basePath = Path('v2/account/referral/');
  const { list } = BaseRestClient<Referral>(basePath, headers);

  return { list };
};
