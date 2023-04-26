import { MockedAxios } from '../../test/MockedAxios.js';
import { API_HOST } from '../../Urls.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../../test/setup.js';
import { Agreement, AgreementParams } from './Agreements.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockAgreement: Agreement = {
  id: '123',
  name: 'test',
  description: 'test',
  type: 'ECOSYSTEM',
  file: 'file',
  created_at: '2022-01-01T00:00:00Z',
  updated_at: '2022-01-02T00:00:00Z',
};

const MockAgreementParams: AgreementParams = {
  name: 'test',
  description: 'test',
  type: 'ECOSYSTEM',
  file: 'file',
};

test('List agreements', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.agreements.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/agreements/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('List agreements with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.agreements.list({ page_size: 10 });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/agreements/`,
    {
      headers: { Authorization: TestKeys },
      params: { page_size: 10 },
    }
  );
});

test('Retrieve agreement', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAgreement,
    status: 200,
  });
  await splight.backoffice.agreements.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/agreements/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Create agreement', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAgreement,
    status: 201,
  });
  await splight.backoffice.agreements.create(MockAgreementParams);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/agreements/`,
    {
      data: MockAgreementParams,
      method: 'post',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Update agreement', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockAgreement, name: 'updated' },
    status: 200,
  });
  await splight.backoffice.agreements.update('123', {
    ...MockAgreementParams,
    name: 'updated',
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/agreements/123/`,
    {
      data: { ...MockAgreementParams, name: 'updated' },
      method: 'patch',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Delete agreement', async () => {
  const mockAgreementId = '123';
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });
  await splight.backoffice.agreements.destroy(mockAgreementId);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/agreements/${mockAgreementId}/`,
    {
      method: 'delete',
      headers: { Authorization: TestKeys },
    }
  );
});
