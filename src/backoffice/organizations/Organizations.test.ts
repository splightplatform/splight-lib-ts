import { MockedAxios } from '../../test/MockedAxios.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../../test/setup.js';
import { OrganizationSubscriptionParams } from './Organizations.js';
import { API_HOST } from '../../Global.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockOrganizationSubscription: OrganizationSubscriptionParams = {
  assets_limit: 20,
  dashboards_limit: 20,
  files_limit: 20,
  secrets_limit: 20,
  components_limit: 5,
  integrations_limit: 5,
  functions_limit: 10,
  alerts_limit: 10,
  compute_slots: 8,
  datalake_gb: 100,
};

test('List organization profiles', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.organizations.profiles.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/profiles/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Subscribe to organization profile', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 200,
  });
  await splight.backoffice.organizations.profiles.setSubscription(
    '123',
    MockOrganizationSubscription
  );
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/profiles/123/subscription/`,
    {
      data: MockOrganizationSubscription,
      headers: { Authorization: TestKeys },
      method: 'post',
      params: undefined,
    }
  );
});

test('Set organization manager', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 200,
  });
  await splight.backoffice.organizations.profiles.update('123', {
    manager_email: '123',
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/profiles/123/`,
    {
      data: {
        manager_email: '123',
      },
      headers: { Authorization: TestKeys },
      method: 'patch',
      params: undefined,
    }
  );
});

test('Get compute', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 200,
  });
  await splight.backoffice.organizations.profiles.compute('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/profiles/123/compute/`,
    {
      headers: { Authorization: TestKeys },
      method: 'get',
      params: undefined,
    }
  );
});

test('Get datalake', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 200,
  });
  await splight.backoffice.organizations.profiles.datalake('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/profiles/123/datalake/`,
    {
      headers: { Authorization: TestKeys },
      method: 'get',
      params: undefined,
    }
  );
});

test('Get storage', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 200,
  });
  await splight.backoffice.organizations.profiles.storage('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/profiles/123/alerts/`,
    {
      headers: { Authorization: TestKeys },
      method: 'get',
      params: undefined,
    }
  );
});
