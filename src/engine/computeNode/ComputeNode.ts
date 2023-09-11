import { post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface ComputeNodeParams {
  name: string;
}

export interface ComputeNode extends ComputeNodeParams {
  id: string;
  status: string;
  last_ping: string;
  last_ip: string;
}

export interface ComputeNodeToken {
  token: string;
}

export const ComputeNodeClient = (headers: Headers) => {
  const basePath = Path('v2/engine/compute_node/');
  const baseClient = BaseRestClient<ComputeNodeParams, ComputeNode>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    generateToken: async (computeNodeId: string) =>
      post<null, ComputeNodeToken>(
        basePath.slash(computeNodeId).slash('generate_token').url,
        null,
        headers
      )
  };
};
