import { get } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface SubscriptionPlanParams {
  name: string;
  amount: number;
  currency: string;
  components_limit: number;
  type: string;
}

export interface SubscriptionPlan extends SubscriptionPlanParams {
  id: string;
}

export const SubscriptionPlansClient = (headers: Headers) => {
  const basePath = Path('backoffice/subscription-plans/');
  const baseClient = BaseRestClient<SubscriptionPlanParams, SubscriptionPlan>(
    basePath,
    headers
  );
  return baseClient;
};

export const BillingClient = (headers: Headers) => {
  const basePath = Path('backoffice/billing/');

  return {
    options: () => get(basePath.slash('options/').url, headers),
    subscriptionPlans: SubscriptionPlansClient(headers),
    fixedInvoicePricing: BaseRestClient(
      basePath.slash('fixed_invoice_pricing/'),
      headers
    ),
  };
};
