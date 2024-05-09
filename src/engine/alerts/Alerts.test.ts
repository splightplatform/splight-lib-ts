import { expect, test } from '@jest/globals';
import { API_HOST } from '../../Global.js';
import { MockedAxios } from '../../test/MockedAxios.js';
import { TestKeys, splight } from '../../test/setup.js';
import { RateAlert, RateAlertParams } from './Alerts.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const mockAlert: RateAlert = {
  id: '123',
  status: 'no_alert',
  name: 'test',
  description: 'test',
  type: 'rate',
  rate_unit: 'minute',
  rate_value: 10,
  severity: 'sev1',
  stmt_time_window: 300,
  stmt_target_variable: 'A',
  stmt_operator: 'eq',
  stmt_aggregation: 'any',
  stmt_thresholds: [],
  alert_items: [],
  assets: [],
  mute: false,
  notify_error: true,
  notify_no_data: true,
  no_data_as_alert: true,
  notify_timeout: true,
  custom_message: null,
  destinations_list: [],
};

const mockAlertParams: RateAlertParams = {
  name: 'test',
  description: 'test',
  severity: 'sev1',
  alert_items: [],
  assets: [],
  type: 'rate',
  rate_unit: 'minute',
  rate_value: 10,
  stmt_time_window: 200,
  stmt_target_variable: 'A',
  stmt_operator: 'eq',
  stmt_aggregation: 'any',
  stmt_thresholds: [],
  mute: false,
  notify_error: true,
  notify_no_data: true,
  no_data_as_alert: true,
  notify_timeout: true,
  custom_message: null,
  destinations_list: [],
} as RateAlertParams;

test('List alerts', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.alerts.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/alert/alerts/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('List alerts with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.engine.alerts.list({ page_size: 10 });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/alert/alerts/`,
    {
      headers: { Authorization: TestKeys },
      params: { page_size: 10 },
    }
  );
});

test('Retrieve alert', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: mockAlert,
    status: 200,
  });
  await splight.engine.alerts.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/alert/alerts/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Create alert', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: mockAlert,
    status: 201,
  });
  await splight.engine.alerts.create(mockAlertParams);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/alert/alerts/`,
    {
      headers: { Authorization: TestKeys },
      method: 'post',
      data: mockAlertParams,
    }
  );
});

test('Update alert', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...mockAlert, name: 'updated' },
    status: 200,
  });
  await splight.engine.alerts.update('123', { name: 'updated' });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/alert/alerts/123/`,
    {
      headers: { Authorization: TestKeys },
      method: 'patch',
      data: { name: 'updated' },
    }
  );
});

test('Delete alert', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: {},
    status: 204,
  });
  await splight.engine.alerts.destroy('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/engine/alert/alerts/123/`,
    {
      headers: { Authorization: TestKeys },
      method: 'delete',
    }
  );
});
