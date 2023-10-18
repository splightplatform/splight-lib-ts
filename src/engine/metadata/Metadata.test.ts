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

test('List metadatas', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.metadatas.list();
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}v2/engine/metadata/`, {
    headers: { Authorization: TestKeys },
  });
});

test('List metadata with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.metadatas.list({
    page_size: 10,
  });
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}v2/engine/metadata/`, {
    headers: { Authorization: TestKeys },
    params: { page_size: 10 },
  });
});

test('Retrieve metadata', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockMetadata,
    status: 200,
  });
  await splight.engine.metadatas.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/metadata/123/`,
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
  await splight.engine.metadatas.create(MockMetadataParams);
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}v2/engine/metadata/`, {
    data: MockMetadataParams,
    method: 'post',
    headers: { Authorization: TestKeys },
  });
});

test('Update metadata', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockMetadata, name: 'updated' },
    status: 200,
  });
  await splight.engine.metadatas.update('123', {
    ...MockMetadataParams,
    name: 'updated',
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/metadata/123/`,
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
  await splight.engine.metadatas.destroy('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/metadata/123/`,
    {
      method: 'delete',
      headers: { Authorization: TestKeys },
    }
  );
});
