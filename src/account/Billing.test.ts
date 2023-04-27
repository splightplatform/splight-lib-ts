import { MockedAxios } from '../test/MockedAxios.js';
import { API_HOST } from '../Urls.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../test/setup.js';
import {
  PaymentAccount,
  PayoutAccount,
  Coupon,
  Discount,
  Subscription,
  ExternalPortalLink,
} from './Billing.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockCoupon: Coupon = {
  amount_off: 10,
  percent_off: 10,
};

const MockDiscount: Discount = {
  coupon: MockCoupon,
};

const MockPaymentAccount: PaymentAccount = {
  id: '123',
  currency: 'test',
  balance: 10,
  discount: MockDiscount,
};

const MockPayoutAccount: PayoutAccount = {
  id: '123',
  currency: 'test',
  capabilities: {
    card_payments: 'test',
    transfers: 'test',
  },
  metadata: {
    test: 'test',
  },
  business_type: 'test',
};

const MockSubscription: Subscription = {
  organization: {
    id: '123',
    name: 'test',
    display_name: 'test',
  },
  subscription_plan: {
    id: '123',
    name: 'test',
    amount: 10,
    currency: 'test',
    components_limit: 10,
    type: 'test',
  },
  start_date: 'test',
  end_date: 'test',
};

const MockExternalPortalLink: ExternalPortalLink = {
  id: '123',
  created: 10,
  expires_at: 10,
  url: 'test',
};

describe('Payment account', () => {
  test('Create payment account', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: MockPaymentAccount,
      status: 200,
    });
    await splight.account.billing.payment.create(MockPaymentAccount);
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/payment/`,
      {
        method: 'post',
        headers: { Authorization: TestKeys },
        data: MockPaymentAccount,
      }
    );
  });

  test('Retrieve my payment account', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: [MockPaymentAccount],
      status: 200,
    });
    await splight.account.billing.payment.myPaymentAccount();
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/payment/my_payment_account/`,
      {
        headers: { Authorization: TestKeys },
        params: undefined,
      }
    );
  });

  test('Get external portal link', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: MockExternalPortalLink,
      status: 200,
    });
    await splight.account.billing.payment.getExternalPortalLink();
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/payment/external_portal/`,
      {
        headers: { Authorization: TestKeys },
        params: undefined,
      }
    );
  });
});

describe('Payout account', () => {
  test('Retrieve my payout account', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: [MockPayoutAccount],
      status: 200,
    });
    await splight.account.billing.payout.myPayoutAccount();
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/payout/my_payout_account/`,
      {
        headers: { Authorization: TestKeys },
        params: undefined,
      }
    );
  });

  test('Get external portal link', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: MockExternalPortalLink,
      status: 200,
    });
    await splight.account.billing.payout.getExternalPortalLink();
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/payout/external_portal/`,
      {
        headers: { Authorization: TestKeys },
        params: undefined,
      }
    );
  });
});

describe('Subscription', () => {
  test('Subscribe', async () => {
    mockedAxios.mockResolvedValueOnce({
      status: 200,
    });
    await splight.account.billing.subscription.subscribe(MockSubscription);
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/subscription/subscribe/`,
      {
        method: 'post',
        headers: { Authorization: TestKeys },
        data: MockSubscription,
      }
    );
  });

  test('Cancel subscription', async () => {
    mockedAxios.mockResolvedValueOnce({
      status: 200,
    });
    await splight.account.billing.subscription.cancel(MockSubscription);
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/subscription/cancel/`,
      {
        method: 'post',
        headers: { Authorization: TestKeys },
        data: MockSubscription,
      }
    );
  });

  test('List subscriptions', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: MockSubscription,
      status: 200,
    });
    await splight.account.billing.subscription.list({ page_size: 10 });
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/subscription/`,
      {
        headers: { Authorization: TestKeys },
        params: { page_size: 10 },
      }
    );
  });
});