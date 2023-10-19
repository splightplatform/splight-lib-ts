import { MockedAxios } from '../../test/MockedAxios.js';
import { expect, test } from '@jest/globals';
import { splight, TestKeys } from '../../test/setup.js';
import { API_HOST } from '../../Global.js';
import {
  SplightHostedComputeNode,
  SplightHostedComputeNodeParams,
} from './ComputeNodes.js';

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockSplightHostedComputeNode: SplightHostedComputeNode = {
  id: '123',
  name: 'test',
  type: 'splight_hosted',
  organization_id: 'orgjse',
  organization_name: 'Splight',
  created_at: '2022-01-01T00:00:00Z',
  agent_version: '1.2.0',
  provision_key_name: '',
  provision_instance_id: '',
  provision_private_ip: '',
  provision_status: 'ready',
  status: 'active',
  last_ip: '193.2.1.2',
  last_ping: '2022-01-01T00:00:00Z',
  region: 'us-east-2',
  instance_type: 't2.micro',
};

const MockSplightHostedComputeNodeParams: SplightHostedComputeNodeParams = {
  name: 'NewCompute',
  organization_id: 'orgjse',
  region: 'us-east-2',
  instance_type: 't2.micro',
};

test('List compute nodes', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.computeNodes.list();
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/compute/nodes/splighthosted/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('List compute node with params', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.computeNodes.list({ page_size: 10 });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/compute/nodes/splighthosted/`,
    {
      headers: { Authorization: TestKeys },
      params: { page_size: 10 },
    }
  );
});

test('Retrieve compute node', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockSplightHostedComputeNode,
    status: 200,
  });
  await splight.backoffice.computeNodes.retrieve('123');
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/compute/nodes/splighthosted/123/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});

test('Create compute node', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockSplightHostedComputeNode,
    status: 201,
  });
  await splight.backoffice.computeNodes.create(
    MockSplightHostedComputeNodeParams
  );
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/compute/nodes/splighthosted/`,
    {
      data: MockSplightHostedComputeNodeParams,
      method: 'post',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Update compute node', async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockSplightHostedComputeNode, name: 'updated' },
    status: 200,
  });
  await splight.backoffice.computeNodes.update('123', {
    ...MockSplightHostedComputeNodeParams,
    name: 'updated',
  });
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/compute/nodes/splighthosted/123/`,
    {
      data: { ...MockSplightHostedComputeNodeParams, name: 'updated' },
      method: 'patch',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Delete compute node', async () => {
  const mockComputeNodeID = '123';
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });
  await splight.backoffice.computeNodes.destroy(mockComputeNodeID);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/compute/nodes/splighthosted/${mockComputeNodeID}/`,
    {
      method: 'delete',
      headers: { Authorization: TestKeys },
    }
  );
});

test('Connection compute node', async () => {
  const mockComputeNodeID = '123';
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: 'something' },
    status: 200,
  });
  await splight.backoffice.computeNodes.connection(mockComputeNodeID);
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}v2/backoffice/compute/nodes/splighthosted/${mockComputeNodeID}/connection/`,
    {
      headers: { Authorization: TestKeys },
      params: undefined,
      responseType: undefined,
    }
  );
});
