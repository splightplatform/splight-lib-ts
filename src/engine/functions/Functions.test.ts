import { MockedAxios } from '../../test/MockedAxios.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../../test/setup.js';
import { API_HOST } from '../../Global.js';
import { RateFunction, RateFunctionParams } from './Functions.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const mockFuntion: RateFunction = {
  id: '123',
  status: 'data',
  name: 'test',
  description: 'test',
  type: 'rate',
  time_window: 300,
  rate_unit: 'minute',
  rate_value: 10,
  target_variable: 'A',
  target_asset: {
    name: 'A',
    id: 'ABC',
  },
  target_attribute: {
    name: 'A',
    id: 'ABC',
  },
  function_items: [],
};

const mockFuntionParams: RateFunctionParams = {
  name: 'test',
  description: 'test',
  type: 'rate',
  time_window: 300,
  rate_unit: 'minute',
  rate_value: 10,
  target_variable: 'A',
  target_asset: {
    name: 'A',
    id: 'ABC',
  },
  target_attribute: {
    name: 'A',
    id: 'ABC',
  },
  function_items: [],
} as RateFunctionParams;

test('List functions', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.functions.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/function/functions/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('List functions with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.functions.list({ page_size: 10 });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/function/functions/`,
    {
      headers: { Authorization: TestKeys },
      params: { page_size: 10 },
    }
  );
});

test('Retrieve function', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: mockFuntion,
    status: 200,
  });
  await splight.engine.functions.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/function/functions/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Create function', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: mockFuntion,
    status: 201,
  });
  await splight.engine.functions.create(mockFuntionParams);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/function/functions/`,
    {
      headers: { Authorization: TestKeys },
      method: 'post',
      data: mockFuntionParams,
    }
  );
});

test('Update function', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...mockFuntion, name: 'updated' },
    status: 200,
  });
  await splight.engine.functions.update('123', { name: 'updated' });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/function/functions/123/`,
    {
      headers: { Authorization: TestKeys },
      method: 'patch',
      data: { name: 'updated' },
    }
  );
});

test('Delete function', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: {},
    status: 204,
  });
  await splight.engine.functions.destroy('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/function/functions/123/`,
    {
      headers: { Authorization: TestKeys },
      method: 'delete',
    }
  );
});
