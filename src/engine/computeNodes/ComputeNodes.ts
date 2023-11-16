import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Component, Headers, PaginatedCollection } from '../../types.js';
import { Path } from '../../Urls.js';

export interface ComputeNodeUsage {
  compute_node: string;
  timestamp: string;
  cpu_percent: number;
  memory_percent: number;
}

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
  agent_version: string;
  usage?: ComputeNodeUsage;
}

export interface ComputeNodeToken {
  token: string;
}

const AllComputeNodesClient = (headers: Headers) => {
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
    components: async (computeNodeId: string) =>
      get<Component[]>(
        basePath.slash(computeNodeId).slash('components').url,
        headers
      ),
    usage: async (computeNodeId: string, limit?: number) =>
      get<PaginatedCollection<ComputeNodeUsage>>(
        basePath.slash(computeNodeId).slash('usage').url,
        headers,
        {
          limit_: limit
        }
      ),
  };
};

const SelfHostedComputeNodesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/compute/nodes/selfhosted/');
  const baseClient = BaseRestClient<ComputeNodeParams, ComputeNode>(
    basePath,
    headers
  );
  return {
    ...baseClient,
  };
};

const SplightHostedComputeNodesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/compute/nodes/splighthosted/');
  const { list, retrieve } = BaseRestClient<ComputeNodeParams, ComputeNode>(
    basePath,
    headers
  );
  return {
    list,
    retrieve,
  };
};

export const ComputeNodesClient = (headers: Headers) => ({
  all: AllComputeNodesClient(headers),
  selfHosted: SelfHostedComputeNodesClient(headers),
  splightHosted: SplightHostedComputeNodesClient(headers),
});
