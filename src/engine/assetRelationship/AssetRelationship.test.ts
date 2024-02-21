import { expect, test } from '@jest/globals';
import { MockedAxios } from '../../test/MockedAxios.js';
import { splight, TestKeys } from '../../test/setup.js';
import {
  AssetRelationship,
  AssetRelationshipParams,
} from './AssetRelationship.js';
import { API_HOST } from '../../Global.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockAssetRelationship: AssetRelationship = {
  id: '123',
  name: 'test',
};

const MockAssetRelationshipParams: AssetRelationshipParams = {
  name: 'test',
};

test('List asset relationships', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assetRelationship.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/relationships/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('List asset relationship with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assetRelationship.list({
    page_size: 10,
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/relationships/`,
    {
      headers: { Authorization: TestKeys },
      params: { page_size: 10 },
    }
  );
});

test('Retrieve asset relationship', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAssetRelationship,
    status: 200,
  });
  await splight.engine.assetRelationship.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/relationships/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Create asset relationship', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAssetRelationship,
    status: 201,
  });
  await splight.engine.assetRelationship.create(MockAssetRelationshipParams);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/relationships/`,
    {
      data: MockAssetRelationshipParams,
      method: 'post',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Update asset relationship', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockAssetRelationship, name: 'updated' },
    status: 200,
  });
  await splight.engine.assetRelationship.update('123', {
    ...MockAssetRelationshipParams,
    name: 'updated',
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/relationships/123/`,
    {
      data: { ...MockAssetRelationshipParams, name: 'updated' },
      method: 'patch',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Delete asset relationship', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });
  await splight.engine.assetRelationship.destroy('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/relationships/123/`,
    {
      method: 'delete',
      headers: { Authorization: TestKeys },
    }
  );
});
