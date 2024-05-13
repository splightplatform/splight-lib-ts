import { Headers } from './types.js';
import { NotificationsClient } from './account/index.js';
import { FeatureFlagsClient } from './account/FeatureFlags.js';
import { UserClient } from './account/User.js';
import { ApiKeysClient } from './account/ApiKeys.js';
import { ActivityClient } from './account/Activity.js';
import { ContractsClient } from './account/Contracts.js';
import { UsersClient } from './account/Users.js';
import {
  PermissionsClient,
  RolesClient,
  SsoRoleMappingsClient,
} from './account/Roles.js';
import { UserInvitationsClient } from './account/UserInvitations.js';

import { ProvisionClient } from './account/Provision.js';

import { IntegrationsClient } from './account/Integrations.js';
import { TagsClient } from './account/Tags.js';
import { ReleasesClient } from './account/Releases.js';

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
    provision: ProvisionClient(headers),
    permissions: PermissionsClient(headers),
    roles: RolesClient(headers),
    ssoRoleMappings: SsoRoleMappingsClient(headers),
    tags: TagsClient(headers),
    releases: ReleasesClient(headers),
  };
};
