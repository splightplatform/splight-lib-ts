import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

const PaymentClient = (basePath: Path, headers: Headers) => {
  const paymentPath = basePath.slash('payment');
  const baseClient = BaseRestClient<any, any, any>(paymentPath, headers);
  const externalPortalPath = paymentPath.slash('external_portal');

  return {
    create: (data: any): Promise<any> => baseClient.create(data),
    list: (params?: any): Promise<any> => baseClient.list(params),
    getExternalPortalUrl: (): Promise<any> => {
      const externalPortalClient = BaseRestClient<any, any, any>(
        externalPortalPath,
        headers
      );
      return externalPortalClient.list();
    },
  };
};

const SubscriptionClient = (basePath: Path, headers: Headers) => {
  const subscriptionPath = basePath.slash('subscription');
  const baseClient = BaseRestClient<any, any, any>(subscriptionPath, headers);
  const cancelPath = subscriptionPath.slash('cancel');
  const subscribePath = subscriptionPath.slash('subscribe');

  return {
    create: (data: any): Promise<any> => baseClient.create(data),
    cancel: (data: any): Promise<any> => {
      const cancelClient = BaseRestClient<any, any, any>(cancelPath, headers);
      return cancelClient.create(data);
    },
    subscribe: (data: any): Promise<any> => {
      const subscribeClient = BaseRestClient<any, any, any>(
        subscribePath,
        headers
      );
      return subscribeClient.create(data);
    },
    retrieve: (pk: string): Promise<any> => baseClient.retrieve(pk),
  };
};

const WebhookClient = (basePath: Path, headers: Headers) => {
  const webhookPath = basePath.slash('webhook');
  const payoutPath = webhookPath.slash('payout');
  const paymentPath = webhookPath.slash('payment');
  const payoutClient = BaseRestClient<any, any, any>(payoutPath, headers);
  const paymentClient = BaseRestClient<any, any, any>(paymentPath, headers);

  return {
    payout: {
      create: (data: any): Promise<any> => payoutClient.create(data),
    },
    payment: {
      create: (data: any): Promise<any> => paymentClient.create(data),
    },
  };
};

const PayoutClient = (basePath: Path, headers: Headers) => {
  const payoutPath = basePath.slash('payout');
  const baseClient = BaseRestClient<any, any, any>(payoutPath, headers);
  const externalPortalPath = payoutPath.slash('external_portal');

  return {
    list: (params?: any): Promise<any> => baseClient.list(params),
    getExternalPortalUrl: (): Promise<any> => {
      const externalPortalClient = BaseRestClient<any, any, any>(
        externalPortalPath,
        headers
      );
      return externalPortalClient.list();
    },
  };
};

const SubscriptionPlan = (basePath: Path, headers: Headers) => {
  const subscriptionPlanPath = basePath.slash('subscription-plan');
  const baseClient = BaseRestClient<any, any, any>(
    subscriptionPlanPath,
    headers
  );

  return {
    list: (params?: any): Promise<any> => baseClient.list(params),
  };
};

export const BillingClient = (headers: Headers) => {
  const basePath = Path('v2/account/billing/');

  return {
    payment: PaymentClient(basePath, headers),
    payout: PayoutClient(basePath, headers),
    subscription: SubscriptionClient(basePath, headers),
    subscriptionPlan: SubscriptionPlan(basePath, headers),
    webhook: WebhookClient(basePath, headers),
  };
};
