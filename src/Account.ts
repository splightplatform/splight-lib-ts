import { Headers } from './types.js';
import { NotificationsClient } from './account/index.js';
import { MeClient } from './account/Me.js';
import { ApiKeysClient } from './account/ApiKeys.js';
import { ActivityClient } from './account/Activity.js';
import { BillingClient } from './account/Billing.js';
import { AgreementsClient } from './account/Agreements.js';
import { UsersClient } from './account/Users.js';
import { UserInvitationsClient } from './account/UserInvitations.js';
import { ReferralClient } from './account/Referral.js';
import { IntegrationsClient } from './account/Integrations.js';

export const Account = (headers: Headers) => {
  return {
    notifications: NotificationsClient(headers),
    me: MeClient(headers),
    apiKeys: ApiKeysClient(headers),
    activity: ActivityClient(headers),
    billing: BillingClient(headers),
    agreements: AgreementsClient(headers),
    users: UsersClient(headers),
    userInvitations: UserInvitationsClient(headers),
    referral: ReferralClient(headers),
    integrations: IntegrationsClient(headers),
  };
};
