import { Headers } from './types.js';
import { NotificationsClient } from './account/index.js';
import { MeClient } from './account/Me.js';
import { ApiKeysClient } from './account/ApiKeys.js';
import { ActivityClient } from './account/Activity.js';
import { AgreementsClient } from './account/Agreements.js';
import { UsersClient } from './account/Users.js';
import { UserInvitationsClient } from './account/UserInvitations.js';

import { ProvisionClient } from './account/Provision.js';

import {
  IntegrationsClient,
  EmailIntegrationsClient,
  TelegramIntegrationsClient,
} from './account/Integrations.js';

export const Account = (headers: Headers) => {
  return {
    notifications: NotificationsClient(headers),
    me: MeClient(headers),
    apiKeys: ApiKeysClient(headers),
    activity: ActivityClient(headers),
    agreements: AgreementsClient(headers),
    users: UsersClient(headers),
    userInvitations: UserInvitationsClient(headers),
    integrations: IntegrationsClient(headers),
    emailIntegrations: EmailIntegrationsClient(headers),
    telegramIntegrations: TelegramIntegrationsClient(headers),
    provision: ProvisionClient(headers),
  };
};
