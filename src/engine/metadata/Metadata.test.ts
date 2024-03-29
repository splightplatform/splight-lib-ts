import { expect, test } from '@jest/globals';
import { MockedAxios } from '../../test/MockedAxios.js';
import { splight, TestKeys } from '../../test/setup.js';
import { Metadata, MetadataParams } from './Metadata.js';
import { API_HOST } from '../../Global.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockMetadata: Metadata = {
  id: '123',
  name: 'test',
  type: 'Number',
};

const MockMetadataParams: MetadataParams = {
  name: 'test',
  type: 'Number',
};

test('List metadata', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assetMetadata.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/metadata/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('List metadata with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assetMetadata.list({
    page_size: 10,
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/metadata/`,
    {
      headers: { Authorization: TestKeys },
      params: { page_size: 10 },
    }
  );
});

test('Retrieve metadata', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockMetadata,
    status: 200,
  });
  await splight.engine.assetMetadata.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/metadata/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Create metadata', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockMetadata,
    status: 201,
  });
  await splight.engine.assetMetadata.create(MockMetadataParams);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/metadata/`,
    {
      data: MockMetadataParams,
      method: 'post',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Update metadata', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockMetadata, name: 'updated' },
    status: 200,
  });
  await splight.engine.assetMetadata.update('123', {
    ...MockMetadataParams,
    name: 'updated',
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/metadata/123/`,
    {
      data: { ...MockMetadataParams, name: 'updated' },
      method: 'patch',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Delete metadata', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });
  await splight.engine.assetMetadata.destroy('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/metadata/123/`,
    {
      method: 'delete',
      headers: { Authorization: TestKeys },
    }
  );
});
