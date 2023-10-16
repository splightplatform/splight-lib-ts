import { MockedAxios } from '../../test/MockedAxios.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../../test/setup.js';
import { Feature } from './Features.js';
import { API_HOST } from '../../Global.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockFeature: Feature = {
  id: '123',
  name: 'feature_new',
  namespace: 'orgjse',
  organization_name: 'Splight',
};

test('List feature', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.features.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/features/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('List features with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.features.list({ page_size: 10 });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/features/`,
    {
      headers: { Authorization: TestKeys },
      params: { page_size: 10 },
    }
  );
});

test('Retrieve feature', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockFeature,
    status: 200,
  });
  await splight.backoffice.features.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/features/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Delete feature', async () => {
  const MockFeatureId = '123';
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });
  await splight.backoffice.features.destroy(MockFeatureId);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/features/${MockFeatureId}/`,
    {
      method: 'delete',
      headers: { Authorization: TestKeys },
    }
  );
});
