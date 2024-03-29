import { expect, test } from '@jest/globals';
import { MockedAxios } from '../../test/MockedAxios.js';
import { splight, TestKeys } from '../../test/setup.js';
import { Attribute, AttributeParams } from './Attributes.js';
import { API_HOST } from '../../Global.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockAttribute: Attribute = {
  id: '123',
  pinned_at: null,
  name: 'test',
  type: 'Number',
  status: 'Connected',
};

const MockAttributeParams: AttributeParams = {
  name: 'test',
  pinned_at: null,
  type: 'Number',
};

test('List attributes', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assetAttributes.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/attributes/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('List attributes with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.assetAttributes.list({
    page_size: 10,
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/attributes/`,
    {
      headers: { Authorization: TestKeys },
      params: { page_size: 10 },
    }
  );
});

test('Retrieve attribute', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAttribute,
    status: 200,
  });
  await splight.engine.assetAttributes.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/attributes/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Create attribute', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAttribute,
    status: 201,
  });
  await splight.engine.assetAttributes.create(MockAttributeParams);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/attributes/`,
    {
      data: MockAttributeParams,
      method: 'post',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Update attribute', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockAttribute, name: 'updated' },
    status: 200,
  });
  await splight.engine.assetAttributes.update('123', {
    ...MockAttributeParams,
    name: 'updated',
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/attributes/123/`,
    {
      data: { ...MockAttributeParams, name: 'updated' },
      method: 'patch',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Delete attribute', async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });
  await splight.engine.assetAttributes.destroy('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/asset/attributes/123/`,
    {
      method: 'delete',
      headers: { Authorization: TestKeys },
    }
  );
});
