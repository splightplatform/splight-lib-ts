import { Headers } from './types.js';
import { NotificationsClient } from './account/index.js';
import { FeatureFlagsClient } from './account/FeatureFlags.js';
import { UserClient } from './account/User.js';
import { ApiKeysClient } from './account/ApiKeys.js';
import { ActivityClient } from './account/Activity.js';
import { ContractsClient } from './account/Contracts.js';
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
    featureFlags: FeatureFlagsClient(headers),
    user: UserClient(headers),
    apiKeys: ApiKeysClient(headers),
    activity: ActivityClient(headers),
    contracts: ContractsClient(headers),
    users: UsersClient(headers),
    userInvitations: UserInvitationsClient(headers),
    integrations: IntegrationsClient(headers),
    emailIntegrations: EmailIntegrationsClient(headers),
    telegramIntegrations: TelegramIntegrationsClient(headers),
    provision: ProvisionClient(headers),
  };
};
