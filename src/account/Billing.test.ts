import { MockedAxios } from '../test/MockedAxios.js';
import { API_HOST } from '../Urls.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../test/setup.js';
import {
  PaymentAccount,
  PayoutAccount,
  Coupon,
  Discount,
  ExternalPortalLink,
} from './Billing.js';
import { ApiFormField } from '../types.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockCoupon: Coupon = {
  amount_off: 10,
  percentage_off: 10,
};

const MockDiscount: Discount = {
  coupon: MockCoupon,
};

const MockPaymentAccount: PaymentAccount = {
  id: '123',
  currency: 'test',
  balance: 10,
  discount: MockDiscount,
  total_price: 10,
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

const MockExternalPortalLink: ExternalPortalLink = {
  id: '123',
  created: 10,
  expires_at: 10,
  url: 'test',
};

const MockApiFormFields: { [key: string]: ApiFormField } = {
  test: {
    type: 'test',
    label: 'test',
    required: true,
    read_only: true,
  },
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

  test('Retrieve payment account', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: [MockPaymentAccount],
      status: 200,
    });
    await splight.account.billing.payment.retrieve();
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/payment/`,
      {
        headers: { Authorization: TestKeys },
        params: undefined,
      }
    );
  });

  test('Retrieve payment account options', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: {
        actions: {
          POST: MockApiFormFields,
        },
      },
      status: 200,
    });
    await splight.account.billing.payment.fields();
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/payment/`,
      {
        headers: { Authorization: TestKeys },
        method: 'options',
      }
    );
  });

  test('Get external portal link', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: MockExternalPortalLink,
      status: 200,
    });
    await splight.account.billing.payment.externalPortal();
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
    await splight.account.billing.payout.retrieve();
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/payout/`,
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
    await splight.account.billing.payout.externalPortal();
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
    await splight.account.billing.subscription.subscribe({
      subscription_plan: '123',
    });
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/subscription/`,
      {
        method: 'post',
        headers: { Authorization: TestKeys },
        data: { subscription_plan: '123' },
      }
    );
  });

  test('Cancel subscription', async () => {
    mockedAxios.mockResolvedValueOnce({
      status: 200,
    });
    await splight.account.billing.subscription.cancel();
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/subscription/cancel/`,
      {
        method: 'post',
        headers: { Authorization: TestKeys },
        data: {},
      }
    );
  });

  test('Get my subscription', async () => {
    mockedAxios.mockResolvedValueOnce({
      status: 200,
    });
    await splight.account.billing.subscription.retrieve();
    expect(mockedAxios).toHaveBeenCalledWith(
      `${API_HOST}v2/account/billing/subscription/`,
      {
        headers: { Authorization: TestKeys },
        params: undefined,
      }
    );
  });
});
