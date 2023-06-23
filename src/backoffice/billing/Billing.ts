import { get } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface SubscriptionPlanParams {
  id?: string;
  name: string;
  type: string;
  components_limit: number
  integrations_limit?: number;
  active_alerts?: number;
  compute_slots?: number;
  datalake_gb?: number;
  file_storage_gb?: number;
}

export interface SubscriptionPlan extends SubscriptionPlanParams {
  id: string;
  amount: number;
}

export const SubscriptionPlansClient = (headers: Headers) => {
  const basePath = Path('v2/backoffice/billing/subscription-plans/');
  const baseClient = BaseRestClient<SubscriptionPlanParams, SubscriptionPlan>(
    basePath,
    headers
  );
  return baseClient;
};

export const BillingClient = (headers: Headers) => {
  const basePath = Path('v2/backoffice/billing/');
  return {
    options: () => get(basePath.slash('options/').url, headers),
    subscriptionPlans: SubscriptionPlansClient(headers),
    fixedInvoicePricing: BaseRestClient(
      basePath.slash('fixed_invoice_pricing/'),
      headers
    ),
  };
};
