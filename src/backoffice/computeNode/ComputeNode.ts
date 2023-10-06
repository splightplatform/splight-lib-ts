import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface SplightHostedComputeNodeParams {
  name: string;
  organization_id: string;
  instance_type:
    | 't2.nano'
    | 't2.micro'
    | 't2.medium'
    | 't2.large'
    | 't2.xlarge'
    | 't2.2xlarge';
}

export interface SplightHostedComputeNode
  extends SplightHostedComputeNodeParams {
  id: string;
  organization_name: string;
  created_at: string;
  status: 'active' | 'inactive';
  last_ping: string;
  last_ip: string;
  type: 'self_hosted' | 'splight_hosted';
  agent_version: string;
  provision_key_name: string;
  provision_private_ip: string;
  provision_instance_id: string;
  provision_status: 'pending' | 'in_progress' | 'ready' | 'failed';
}

export const ComputeNodeClient = (headers: Headers) => {
  const basePath = Path('v2/backoffice/compute/nodes/splighthosted/');
  const baseClient = BaseRestClient<
    SplightHostedComputeNodeParams,
    SplightHostedComputeNode
  >(basePath, headers);
  return baseClient;
};
