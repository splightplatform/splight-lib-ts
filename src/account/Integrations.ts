import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface Integration {
  id: string;
  subclass: string;
}

export interface EmailIntegration {
  id?: string;
  email_list: string[];
  event_type: string[];
}

export interface SlackIntegration {
  id?: string;
  bot_token: string;
  channel_name: string;
  event_type: string[];
}

export interface TelegramIntegration {
  id?: string;
  chat_id: string;
  event_type: string[];
}

export const IntegrationsClient = (headers: Headers) => {
  const basePath = Path('v2/account/integrations/all/');
  const { list } = BaseRestClient<Integration>(basePath, headers);
  return {
    list,
  };
};

export const EmailIntegrationsClient = (headers: Headers) => {
  const basePath = Path('v2/account/integrations/email/');
  const { create, retrieve, update, destroy } =
    BaseRestClient<EmailIntegration>(basePath, headers);
  return {
    create,
    retrieve,
    update,
    destroy,
  };
};

export const SlackIntegrationsClient = (headers: Headers) => {
  const basePath = Path('v2/account/integrations/slack/');
  const { create, retrieve, update, destroy } =
    BaseRestClient<SlackIntegration>(basePath, headers);
  return {
    create,
    retrieve,
    update,
    destroy,
  };
};

export const TelegramIntegrationsClient = (headers: Headers) => {
  const basePath = Path('v2/account/integrations/telegram/');
  const { create, retrieve, update, destroy } =
    BaseRestClient<TelegramIntegration>(basePath, headers);
  return {
    create,
    retrieve,
    update,
    destroy,
  };
};
