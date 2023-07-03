export type Coupon = {
  amount_off: number;
  percentage_off: number;
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
  id: string;
  organization_id: string;
  active: boolean;
  start_date: string;
  end_date: string;
  components_limit: number;
  integrations_limit: number;
  active_alerts: number;
  compute_slots: number;
  datalake_gb: number;
  file_storage_gb: number;
}

export interface PayoutAccount {
  id?: string;
  currency?: string;
  capabilities?: Record<string, string>;
  metadata?: Record<string, string>;
  business_type?: string;
  payouts_enabled?: boolean;
  referral_code: string;
}

export interface ExternalPortalLink {
  id?: string;
  created?: number;
  expires_at?: number;
  url: string;
}
