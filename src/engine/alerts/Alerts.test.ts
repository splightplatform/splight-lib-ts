import { MockedAxios } from '../../test/MockedAxios.js';
import { API_HOST } from '../../Urls.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../../test/setup.js';
import { Alert, AlertParams } from './Alerts.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockAlert: Alert = {
  id: '123',
  name: 'test',
  description: 'test',
  message: 'test',
  period: 10,
  notification_emails: [],
  status: 'test',
  active: true,
  conditions: [],
};

const MockAlertParams: AlertParams = {
  name: 'test',
  description: 'test',
};

test('List alerts', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.alerts.list();
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}v2/engine/alert/alerts/`, {
    headers: { Authorization: TestKeys },
  });
});

test('List alerts with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.alerts.list({ page_size: 10 });
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}v2/engine/alert/alerts/`, {
    headers: { Authorization: TestKeys },
    params: { page_size: 10 },
  });
});

test('Retrieve alert', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAlert,
    status: 200,
  });
  await splight.engine.alerts.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}v2/engine/alert/alerts/123/`, {
    headers: { Authorization: TestKeys },
  });
});

test('Create alert', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAlert,
    status: 201,
  });
  await splight.engine.alerts.create(MockAlertParams);
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}v2/engine/alert/alerts/`, {
    headers: { Authorization: TestKeys },
    method: 'post',
    data: MockAlertParams,
  });
})

test('Update alert', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockAlert, name: 'updated' },
    status: 200,
  });
  await splight.engine.alerts.update('123', { name: 'updated' });
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}v2/engine/alert/alerts/123/`, {
    headers: { Authorization: TestKeys },
    method: 'patch',
    data: { name: 'updated' },
  });
});

test('Delete alert', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: {},
    status: 204,
  });
  await splight.engine.alerts.destroy('123');
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}v2/engine/alert/alerts/123/`, {
    headers: { Authorization: TestKeys },
    method: 'delete',
  });
});




