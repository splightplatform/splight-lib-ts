import { MockedAxios } from '../../test/MockedAxios.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../../test/setup.js';
import {
  OrganizationAlertsParams,
  OrganizationComputeParams,
  OrganizationDatalakeParams,
} from './Organizations.js';
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
  file_storage_gb: 100,
};

const MockOrganizationCompute: OrganizationComputeParams = {
  xlarge_nodes: 1,
};

const MockOrganizationAlerts: OrganizationAlertsParams = {
  replicas: 1,
};

const MockOrganizationDatalake: OrganizationDatalakeParams = {
  size_in_gb: 10,
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

test('Set compute', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 200,
  });
  await splight.backoffice.organizations.profiles.setCompute(
    '123',
    MockOrganizationCompute
  );
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/profiles/123/compute/`,
    {
      data: MockOrganizationCompute,
      headers: { Authorization: TestKeys },
      method: 'post',
      params: undefined,
    }
  );
});

test('Set datalake', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 200,
  });
  await splight.backoffice.organizations.profiles.setDatalake(
    '123',
    MockOrganizationDatalake
  );
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/profiles/123/datalake/`,
    {
      data: MockOrganizationDatalake,
      headers: { Authorization: TestKeys },
      method: 'post',
      params: undefined,
    }
  );
});

test('Set alerts', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 200,
  });
  await splight.backoffice.organizations.profiles.setAlerts(
    '123',
    MockOrganizationAlerts
  );
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/profiles/123/alerts/`,
    {
      data: MockOrganizationAlerts,
      headers: { Authorization: TestKeys },
      method: 'post',
      params: undefined,
    }
  );
});
