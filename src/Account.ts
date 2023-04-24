import { Headers } from './types.js';
import { NotificationsClient } from './account/index.js';
import { MeClient } from './account/Me.js';
import { ApiKeysClient } from './account/ApiKeys.js';
import { ActivityClient } from './account/Activity.js';
import { BillingClient } from './account/Billing.js';

export const Account = (headers: Headers) => {
  return {
    notifications: NotificationsClient(headers),
    me: MeClient(headers),
    apiKeys: ApiKeysClient(headers),
    activity: ActivityClient(headers),
    billing: BillingClient(headers),
  };
};
