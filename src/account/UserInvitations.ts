import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export type UserInvitationParams = Pick<
  UserInvitation,
  'inviter' | 'invitee' | 'roles'
> &
  Partial<UserInvitation>;

export interface UserInvitation {
  id: string;
  organization_id: string;
  inviter: { name: string };
  invitee: { email: string };
  invitation_url: string;
  created_at: string;
  expires_at: string;
  client_id: string;
  roles: [string];
  ticket_id: string;
}

export const UserInvitationsClient = (headers: Headers) => {
  const basePath = Path('v2/account/user/invitations/');
  const { list, create, destroy } = BaseRestClient<
    UserInvitationParams,
    UserInvitation
  >(basePath, headers);
  return {
    list,
    create,
    destroy,
  };
};
