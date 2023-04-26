import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface UserInvitation {
  id: string;
  organization_id: string;
  inviter: { name: string };
  invitee: { email: string };
  app_metadata: {
    is_manager: boolean;
  };
  user_metadata: {
    picture_color: string;
    theme: string;
    language: string;
  };
  invitation_url: string;
  created_at: string;
  expires_at: string;
  client_id: string;
  roles: [string];
  ticket_id: string;
}

export const UserInvitationsClient = (headers: Headers) => {
  const basePath = Path('v2/account/user/invitations/');
  const { list } = BaseRestClient<UserInvitation, UserInvitation>(
    basePath,
    headers
  );
  return {
    list,
  };
};
