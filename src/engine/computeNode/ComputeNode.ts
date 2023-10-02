import { post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Component, Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface ComputeNodeParams {
  name: string;
}

export interface ComputeNode extends ComputeNodeParams {
  id: string;
  created_at: string;
  status: string;
  last_ping: string;
  last_ip: string;
  type: string;
  components: Component[];
}

export interface SplightHostedComputeNodeParams {
  name: string;
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
  created_at: string;
  status: string;
  last_ping: string;
  last_ip: string;
  type: string;
  components: Component[];
}

export interface ComputeNodeToken {
  token: string;
}

export const ComputeNodeClient = (headers: Headers) => {
  const basePath = Path('v2/engine/compute/nodes/all/');
  const { list, retrieve } = BaseRestClient<ComputeNodeParams, ComputeNode>(
    basePath,
    headers
  );
  return {
    list,
    retrieve,
    generateToken: async (computeNodeId: string) =>
      post<null, ComputeNodeToken>(
        basePath.slash(computeNodeId).slash('generate_token').url,
        null,
        headers
      ),
  };
};

export const SelfHostedComputeNodeClient = (headers: Headers) => {
  const basePath = Path('v2/engine/compute/nodes/selfhosted/');
  const baseClient = BaseRestClient<ComputeNodeParams, ComputeNode>(
    basePath,
    headers
  );
  return {
    ...baseClient,
  };
};

export const SplightHostedComputeNodeClient = (headers: Headers) => {
  const basePath = Path('v2/engine/compute/nodes/splighthosted/');
  const { list, retrieve } = BaseRestClient<
    SplightHostedComputeNodeParams,
    SplightHostedComputeNode
  >(basePath, headers);
  return {
    list,
    retrieve,
  };
};
