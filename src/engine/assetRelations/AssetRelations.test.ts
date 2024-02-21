import { expect, test } from '@jest/globals';
import { MockedAxios } from '../../test/MockedAxios.js';
import { splight, TestKeys } from '../../test/setup.js';
import { AssetRelation, AssetRelationParam } from './AssetRelations.js';
import { API_HOST } from '../../Global.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockAssetRelations: AssetRelation = {
  id: '123',
  name: 'test',
};

const MockAssetRelationsParam: AssetRelationParam = {
  name: 'test',
};

test('List asset relations', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assetRelations.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/relations/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('List asset relations with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assetRelations.list({
    page_size: 10,
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/relations/`,
    {
      headers: { Authorization: TestKeys },
      params: { page_size: 10 },
    }
  );
});

test('Retrieve asset relations', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAssetRelations,
    status: 200,
  });
  await splight.engine.assetRelations.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/relations/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Create asset relations', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAssetRelations,
    status: 201,
  });
  await splight.engine.assetRelations.create(MockAssetRelationsParam);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/relations/`,
    {
      data: MockAssetRelationsParam,
      method: 'post',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Update asset relations', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockAssetRelations, name: 'updated' },
    status: 200,
  });
  await splight.engine.assetRelations.update('123', {
    ...MockAssetRelationsParam,
    name: 'updated',
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/relations/123/`,
    {
      data: { ...MockAssetRelationsParam, name: 'updated' },
      method: 'patch',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Delete asset relations', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });
  await splight.engine.assetRelations.destroy('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/relations/123/`,
    {
      method: 'delete',
      headers: { Authorization: TestKeys },
    }
  );
});
