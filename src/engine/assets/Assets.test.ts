import { MockedAxios } from '../../test/MockedAxios.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../../test/setup.js';
import { Asset, AssetParams } from './Assets.js';
import { API_HOST } from '../../Global.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockAsset: Asset = {
  id: '123',
  attributes: [],
  name: 'test',
  pinned_at: null,
  geometry: {
    type: 'GeometryCollection',
    geometries: [],
  },
  organization: 'Splight',
  verified: false,
  description: 'test',
  status: 'no_alert',
};

const MockAssetParams: AssetParams = {
  name: 'test',
  description: 'test',
  pinned_at: null,
};

test('List assets', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assets.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/assets/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('List assets with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assets.list({ page_size: 10 });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/assets/`,
    {
      headers: { Authorization: TestKeys },
      params: { page_size: 10 },
    }
  );
});

test('Retrieve asset', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAsset,
    status: 200,
  });
  await splight.engine.assets.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/assets/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Create asset', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAsset,
    status: 201,
  });
  await splight.engine.assets.create(MockAssetParams);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/assets/`,
    {
      data: MockAssetParams,
      method: 'post',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Update asset', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockAsset, name: 'updated' },
    status: 200,
  });
  await splight.engine.assets.update('123', {
    ...MockAssetParams,
    name: 'updated',
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/assets/123/`,
    {
      data: { ...MockAssetParams, name: 'updated' },
      method: 'patch',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Delete asset', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });
  await splight.engine.assets.destroy('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/assets/123/`,
    {
      method: 'delete',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Get asset attributes', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assets.attributes({ pk: '123' });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/assets/123/attributes/`,
    {
      headers: { Authorization: TestKeys },
      params: {},
    }
  );
});
