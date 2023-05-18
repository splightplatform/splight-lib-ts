import { get } from '../rest/BaseMethods.js';
import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers, OrganizationProfile } from '../types.js';
import { Path } from '../Urls.js';

export interface TelegramIntegration {
  event_type: string;
  chat_id: string;
}

export const TelegramIntegrationsClient = (headers: Headers) => {
  const basePath = Path('v2/account/integrations/telegram/');
  const { list, update, retrieve } = BaseRestClient<User, User>(
    basePath,
    headers
  );
  return {
    list,
    update,
    retrieve,
  };
};
