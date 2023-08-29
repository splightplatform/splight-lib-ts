import { MockedAxios } from '../../test/MockedAxios.js';
import { API_HOST } from '../../Urls.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../../test/setup.js';
import { Contract, ContractParams } from './Contracts.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockContract: Contract = {
  id: '123',
  name: 'test',
  description: 'test',
  type: 'ECOSYSTEM',
  file: 'file',
  created_at: '2022-01-01T00:00:00Z',
  updated_at: '2022-01-02T00:00:00Z',
};

const MockContractParams: ContractParams = {
  name: 'test',
  description: 'test',
  type: 'ECOSYSTEM',
  file: 'file',
};

test('List contracts', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.contracts.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/contracts/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('List contracts with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.contracts.list({ page_size: 10 });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/contracts/`,
    {
      headers: { Authorization: TestKeys },
      params: { page_size: 10 },
    }
  );
});

test('Retrieve contract', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockContract,
    status: 200,
  });
  await splight.backoffice.contracts.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/contracts/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Create contract', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockContract,
    status: 201,
  });
  await splight.backoffice.contracts.create(MockContractParams);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/contracts/`,
    {
      data: MockContractParams,
      method: 'post',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Update contract', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockContract, name: 'updated' },
    status: 200,
  });
  await splight.backoffice.contracts.update('123', {
    ...MockContractParams,
    name: 'updated',
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/contracts/123/`,
    {
      data: { ...MockContractParams, name: 'updated' },
      method: 'patch',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Delete contract', async () => {
  const mockContractId = '123';
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });
  await splight.backoffice.contracts.destroy(mockContractId);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/contracts/${mockContractId}/`,
    {
      method: 'delete',
      headers: { Authorization: TestKeys },
    }
  );
});
