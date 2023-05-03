import { MockedAxios } from '../../test/MockedAxios.js';
import { API_HOST } from '../../Urls.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../../test/setup.js';
import { OrganizationProfile, OrganizationRequest } from './Organization.js';
import { ApiFormField } from '../../types.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockOrganizationRequest: OrganizationRequest = {
  id: '123',
  name: 'test',
  email: 'test@hotmail.com',
  company_name: 'test',
  country: 'test',
  address_line_1: 'test',
  address_line_2: 'test',
  city: 'test',
  state: 'test',
  postal_code: 'test',
  message: 'test',
  referred_by: 'test',
  created_at: '2021-01-01',
  updated_at: '2021-01-01',
};

const MockApiFormFields: { [key: string]: ApiFormField } = {
  test: {
    type: 'test',
    label: 'test',
    required: true,
    read_only: true,
  },
};

test('List organization requests', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.organization.requests.list();
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
  await splight.backoffice.organization.requests.fields();
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
  await splight.backoffice.organization.requests.activate('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/requests/123/activate/`,
    {
      data: {},
      headers: { Authorization: TestKeys },
      method: 'post',
      params: undefined
    }
  );
});

test('Create organization request', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockOrganizationRequest,
    status: 200,
  });
  await splight.backoffice.organization.requests.create(
    MockOrganizationRequest,
    { captcha: 'test' }
  );
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/requests/`,
    {
      headers: { Authorization: TestKeys },
      method: 'post',
      data: MockOrganizationRequest,
      params: {
        captcha: 'test',
      },
    }
  );
});

test('List organization profiles', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.organization.profiles.list();
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
  await splight.backoffice.organization.profiles.subscribe('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/profiles/123/subscribe/`,
    {
      data: {},
      headers: { Authorization: TestKeys },
      method: 'post',
      params: undefined,
    }
  );
});

test('Unsubscribe from organization profile', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 200,
  });
  await splight.backoffice.organization.profiles.unsubscribe('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/profiles/123/unsubscribe/`,
    {
      data: {},
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
  await splight.backoffice.organization.profiles.setOrganizationManager('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/organization/profiles/123/set_organization_manager/`,
    {
      data: {},
      headers: { Authorization: TestKeys },
      method: 'post',
      params: undefined,
    }
  );
});
