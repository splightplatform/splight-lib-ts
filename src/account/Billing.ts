import { SubscriptionPlan } from '../backoffice/billing/Billing.js';
import { get } from '../rest/BaseMethods.js';
import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers, PaginatedCollection } from '../types.js';
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
}

export interface SubscriptionParams {
  organization: Organization;
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
  const baseClient = BaseRestClient<PaymentAccountParams, PaymentAccount>(
    paymentPath,
    headers
  );
  const externalPortalPath = paymentPath.slash('external_portal');
  const myPaymentAccountPath = paymentPath.slash('my_payment_account');

  return {
    myPaymentAccount: () =>
      get<PaymentAccount>(myPaymentAccountPath.url, headers),
    create: (data: PaymentAccountParams): Promise<PaymentAccount> =>
      baseClient.create(data),
    externalPortal: () =>
      get<ExternalPortalLink>(externalPortalPath.url, headers),
  };
};

const SubscriptionClient = (basePath: Path, headers: Headers) => {
  const subscriptionPath = basePath.slash('subscription');
  const baseClient = BaseRestClient<SubscriptionParams, Subscription>(
    subscriptionPath,
    headers
  );
  const cancelPath = subscriptionPath.slash('cancel');
  const subscribePath = subscriptionPath.slash('subscribe');

  return {
    cancel: (data: SubscriptionParams): Promise<Response> => {
      const cancelClient = BaseRestClient<SubscriptionParams, Response>(
        cancelPath,
        headers
      );
      return cancelClient.create(data);
    },
    subscribe: (data: SubscriptionParams): Promise<Response> => {
      const subscribeClient = BaseRestClient<SubscriptionParams, Response>(
        subscribePath,
        headers
      );
      return subscribeClient.create(data);
    },
    list: (params: {
      page?: number;
      page_size?: number;
    }): Promise<PaginatedCollection<Subscription>> => baseClient.list(params),
  };
};

const PayoutClient = (basePath: Path, headers: Headers) => {
  const payoutPath = basePath.slash('payout');
  const externalPortalPath = payoutPath.slash('external_portal');
  const myPayoutAccountPath = payoutPath.slash('my_payout_account');

  return {
    myPayoutAccount: () => get<PayoutAccount>(myPayoutAccountPath.url, headers),
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
