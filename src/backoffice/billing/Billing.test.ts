import { MockedAxios } from '../../test/MockedAxios.js';
import { API_HOST } from '../../Urls.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../../test/setup.js';
import { SubscriptionPlan, SubscriptionPlanParams } from './Billing.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockSubscriptionPlan: SubscriptionPlan = {
  id: '123',
  name: 'test',
  amount: 10,
  currency: 'USD',
  components_limit: 100,
  type: 'type',
};

const MockSubscriptionPlanParams: SubscriptionPlanParams = {
  name: 'test',
  amount: 10,
  currency: 'USD',
  components_limit: 100,
  type: 'type',
};

test('List subscription plans', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.billing.subscriptionPlans.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}backoffice/subscription-plans/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('List subscription plans with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.billing.subscriptionPlans.list({ page_size: 10 });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}backoffice/subscription-plans/`,
    {
      headers: { Authorization: TestKeys },
      params: { page_size: 10 },
    }
  );
});

test('Retrieve subscription plan', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockSubscriptionPlan,
    status: 200,
  });
  await splight.backoffice.billing.subscriptionPlans.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}backoffice/subscription-plans/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Create subscription plan', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockSubscriptionPlan,
    status: 201,
  });
  await splight.backoffice.billing.subscriptionPlans.create(
    MockSubscriptionPlanParams
  );
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}backoffice/subscription-plans/`,
    {
      data: MockSubscriptionPlanParams,
      method: 'post',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Update subscription plan', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockSubscriptionPlan, name: 'updated' },
    status: 200,
  });
  await splight.backoffice.billing.subscriptionPlans.update('123', {
    ...MockSubscriptionPlanParams,
    name: 'updated',
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}backoffice/subscription-plans/123/`,
    {
      data: { ...MockSubscriptionPlanParams, name: 'updated' },
      method: 'patch',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Delete subscription plan', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });

  const subscriptionPlanId = '123';
  await splight.backoffice.billing.subscriptionPlans.destroy(
    subscriptionPlanId
  );

  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}backoffice/subscription-plans/${subscriptionPlanId}/`,
    {
      method: 'delete',
      headers: { Authorization: TestKeys },
    }
  );
});
