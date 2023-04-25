import { HttpStatusCode } from 'axios';
import { SubscriptionPlan } from '../backoffice/billing/Billing.js';
import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers, PaginatedCollection } from '../types.js';
import { Path } from '../Urls.js';
import { Organization } from './Me.js';

export type Coupon = {
  amount_off: number
  percent_off: number
}

export type Discount = {
  coupon: Coupon
}

export interface PaymentAccount {
  id?: string
  currency: string
  balance: number
  discount: Discount
}

export interface Subscription {
  organization: Organization
  subscription_plan: SubscriptionPlan
  start_date: string
  end_date: string
}

export interface PayoutAccount {
  id?: string
  organization_id?: string
  currency: string
  capabilities: Record<string, string>
  metadata: Record<string, string>
  business_type: string
}

export interface ExternalPortalLink {
  id?: string
  created?: number
  expires_at?: number
  url: string
}

const PaymentClient = (basePath: Path, headers: Headers) => {
  const paymentPath = basePath.slash('payment');
  const baseClient = BaseRestClient<Record<string, string>, PaymentAccount>(paymentPath, headers);
  const externalPortalPath = paymentPath.slash('external_portal');

  return {
    create: (data: any): Promise<PaymentAccount> => baseClient.create(data),
    list: (params?: any): Promise<PaginatedCollection<PaymentAccount>> => baseClient.list(params),
    getExternalPortalLink: (pk: string): Promise<ExternalPortalLink> => {
      const externalPortalClient = BaseRestClient<string,ExternalPortalLink>(
        externalPortalPath,
        headers
      );
      return externalPortalClient.retrieve(pk);
    },
  };
};

const SubscriptionClient = (basePath: Path, headers: Headers) => {
  const subscriptionPath = basePath.slash('subscription');
  const baseClient = BaseRestClient<Record<string, string>, Subscription>(subscriptionPath, headers);
  const cancelPath = subscriptionPath.slash('cancel');
  const subscribePath = subscriptionPath.slash('subscribe');

  return {
    create: (data: Record<string, string>): Promise<Subscription> => baseClient.create(data),
    cancel: (data: Record<string, string>): Promise<HttpStatusCode> => {
      const cancelClient = BaseRestClient<Record<string, string>, HttpStatusCode>(cancelPath, headers);
      return cancelClient.create(data);
    },
    subscribe: (data: Record<string, string>): Promise<HttpStatusCode> => {
      const subscribeClient = BaseRestClient<Record<string, string>, HttpStatusCode>(
        subscribePath,
        headers
      );
      return subscribeClient.create(data);
    },
    retrieve: (pk: string): Promise<Subscription> => baseClient.retrieve(pk),
  };
};

const PayoutClient = (basePath: Path, headers: Headers) => {
  const payoutPath = basePath.slash('payout');
  const baseClient = BaseRestClient<Record<string, string>, PayoutAccount>(payoutPath, headers);
  const externalPortalPath = payoutPath.slash('external_portal');

  return {
    list: (params?: any): Promise<PaginatedCollection<PayoutAccount>> => baseClient.list(params),
    getExternalPortalLink: (pk: string): Promise<ExternalPortalLink> => {
      const externalPortalClient = BaseRestClient<string,ExternalPortalLink>(
        externalPortalPath,
        headers
      );
      return externalPortalClient.retrieve(pk);
    },
  };
};

const SubscriptionPlanClient = (basePath: Path, headers: Headers) => {
  const subscriptionPlanPath = basePath.slash('subscription-plan');
  const baseClient = BaseRestClient<SubscriptionPlan>(
    subscriptionPlanPath,
    headers
  );

  return {
    list: (): Promise<PaginatedCollection<SubscriptionPlan>> => baseClient.list(),
  };
};

export const BillingClient = (headers: Headers) => {
  const basePath = Path('v2/account/billing/');

  return {
    payment: PaymentClient(basePath, headers),
    payout: PayoutClient(basePath, headers),
    subscription: SubscriptionClient(basePath, headers),
    subscriptionPlan: SubscriptionPlanClient(basePath, headers),
  };
};
