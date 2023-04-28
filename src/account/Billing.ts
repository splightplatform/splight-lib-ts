import { SubscriptionPlan } from '../backoffice/billing/Billing.js';
import { get, options, post } from '../rest/BaseMethods.js';
import { BaseRestClient } from '../rest/BaseRestClient.js';
import { ApiFormField, Headers } from '../types.js';
import { Path } from '../Urls.js';
import { Organization } from './Me.js';

export type Coupon = {
  amount_off: number;
  percent_off: number;
};

export type Discount = {
  coupon: Coupon;
};

export interface PaymentAccountParams {
  currency?: string;
  discount?: Discount;
}

export interface PaymentAccount {
  id?: string;
  currency: string;
  balance: number;
  discount: Discount;
  total_price: number;
}

export interface Subscription {
  organization: Organization;
  subscription_plan: SubscriptionPlan;
  start_date: string;
  end_date: string;
}

export interface PayoutAccountParams {
  currency: string;
  capabilities: Record<string, string>;
  metadata: Record<string, string>;
  business_type: string;
}

export interface PayoutAccount {
  id?: string;
  organization_id?: string;
  currency: string;
  capabilities: Record<string, string>;
  metadata: Record<string, string>;
  business_type: string;
}

export interface ExternalPortalLink {
  id?: string;
  created?: number;
  expires_at?: number;
  url: string;
}

const PaymentClient = (basePath: Path, headers: Headers) => {
  const paymentPath = basePath.slash('payment');
  const externalPortalPath = paymentPath.slash('external_portal');
  const baseClient = BaseRestClient<PaymentAccountParams, PaymentAccount>(
    paymentPath,
    headers
  );

  return {
    retrieve: () => get<PaymentAccount>(paymentPath.url, headers),
    fields: async () =>
      (
        await options<{ actions: { POST: { [key: string]: ApiFormField } } }>(
          paymentPath.url,
          headers
        )
      ).actions.POST,
    create: (data: PaymentAccountParams): Promise<PaymentAccount> =>
      baseClient.create(data),
    externalPortal: () =>
      get<ExternalPortalLink>(externalPortalPath.url, headers),
  };
};

const SubscriptionClient = (basePath: Path, headers: Headers) => {
  const subscriptionPath = basePath.slash('subscription');
  const cancelPath = subscriptionPath.slash('cancel');
  const subscribePath = subscriptionPath.slash('subscribe');

  return {
    cancel: () => post(cancelPath.url, {}, headers),
    subscribe: (data: { plan: SubscriptionPlan }): Promise<Response> =>
      post(subscribePath.url, data, headers),
    retrieve: () => get<Subscription>(subscriptionPath.url, headers),
  };
};

const PayoutClient = (basePath: Path, headers: Headers) => {
  const payoutPath = basePath.slash('payout');
  const externalPortalPath = payoutPath.slash('external_portal');

  return {
    retrieve: () => get<PaymentAccount>(payoutPath.url, headers),
    externalPortal: () =>
      get<ExternalPortalLink>(externalPortalPath.url, headers),
  };
};

export const BillingClient = (headers: Headers) => {
  const basePath = Path('v2/account/billing/');

  return {
    payment: PaymentClient(basePath, headers),
    payout: PayoutClient(basePath, headers),
    subscription: SubscriptionClient(basePath, headers),
  };
};
