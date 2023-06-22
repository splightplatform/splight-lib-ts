import { MockedAxios } from '../../test/MockedAxios.js';
import { API_HOST } from '../../Urls.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../../test/setup.js';
import {
  OrganizationAlertsParams,
  OrganizationComputeParams,
  OrganizationDatalakeParams,
} from './Organizations.js';
import { ApiFormField } from '../../types.js';
import { OrganizationSubscriptionParams } from './Organizations.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockApiFormFields: { [key: string]: ApiFormField } = {
  test: {
    type: 'test',
    label: 'test',
    required: true,
    read_only: true,
  },
};

const MockOrganizationSubscription: OrganizationSubscriptionParams = {
  subscription_plan: '1234',
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

test('List organization requests', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.organizations.requests.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/requests/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Retrieve organization requests options', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: {
      actions: {
        POST: MockApiFormFields,
      },
    },
    status: 200,
  });
  await splight.backoffice.organizations.requests.fields();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/requests/`,
    {
      headers: { Authorization: TestKeys },
      method: 'options',
    }
  );
});

test('Activate organization request', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 200,
  });
  await splight.backoffice.organizations.requests.activate('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/requests/123/activate/`,
    {
      data: {},
      headers: { Authorization: TestKeys },
      method: 'post',
      params: undefined,
    }
  );
});

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
