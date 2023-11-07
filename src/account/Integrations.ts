import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface Integration {
  id: string;
  type: string;
}

export interface EmailIntegrationParams {
  id?: string;
  email_list: string[];
  event_type: string[];
}

export interface EmailIntegration extends EmailIntegrationParams {
  type: string;
}

export interface TelegramIntegrationParams {
  id?: string;
  chat_id: string;
  event_type: string[];
}

export interface TelegramIntegration extends TelegramIntegrationParams {
  type: string;
}

const AllIntegrationsClient = (headers: Headers) => {
  const basePath = Path('v2/account/integrations/all/');
  const { list } = BaseRestClient<Integration>(basePath, headers);
  return {
    list,
  };
};

const EmailIntegrationsClient = (headers: Headers) => {
  const basePath = Path('v2/account/integrations/email/');
  const { create, retrieve, update, destroy } = BaseRestClient<
    EmailIntegrationParams,
    EmailIntegration
  >(basePath, headers);
  return {
    create,
    retrieve,
    update,
    destroy,
  };
};

const TelegramIntegrationsClient = (headers: Headers) => {
  const basePath = Path('v2/account/integrations/telegram/');
  const { create, retrieve, update, destroy } = BaseRestClient<
    TelegramIntegrationParams,
    TelegramIntegration
  >(basePath, headers);
  return {
    create,
    retrieve,
    update,
    destroy,
  };
};

export const IntegrationsClient = (headers: Headers) => ({
  all: AllIntegrationsClient(headers),
  email: EmailIntegrationsClient(headers),
  telegram: TelegramIntegrationsClient(headers),
});
