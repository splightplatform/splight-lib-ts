import { expect, test } from '@jest/globals';
import { MockedAxios } from '../../test/MockedAxios.js';
import { splight, TestKeys } from '../../test/setup.js';
import { AssetFlow, AssetFlowParam } from './AssetFlow.js';
import { API_HOST } from '../../Global.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockAssetFlow: AssetFlow = {
  id: '123',
  name: 'test',
};

const MockAssetFlowParam: AssetFlowParam = {
  name: 'test',
};

test('List asset flow', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assetFlow.list();
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}v2/engine/asset/flow`, {
    headers: { Authorization: TestKeys },
  });
});

test('List asset flow with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assetFlow.list({
    page_size: 10,
  });
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}v2/engine/asset/flow`, {
    headers: { Authorization: TestKeys },
    params: { page_size: 10 },
  });
});

test('Retrieve asset flow', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAssetFlow,
    status: 200,
  });
  await splight.engine.assetFlow.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/flow/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Create asset flow', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAssetFlow,
    status: 201,
  });
  await splight.engine.assetFlow.create(MockAssetFlowParam);
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}v2/engine/asset/flow`, {
    data: MockAssetFlowParam,
    method: 'post',
    headers: { Authorization: TestKeys },
  });
});

test('Update asset flow', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockAssetFlow, name: 'updated' },
    status: 200,
  });
  await splight.engine.assetFlow.update('123', {
    ...MockAssetFlowParam,
    name: 'updated',
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/flow/123/`,
    {
      data: { ...MockAssetFlowParam, name: 'updated' },
      method: 'patch',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Delete asset flow', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });
  await splight.engine.assetFlow.destroy('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/flow/123/`,
    {
      method: 'delete',
      headers: { Authorization: TestKeys },
    }
  );
});
