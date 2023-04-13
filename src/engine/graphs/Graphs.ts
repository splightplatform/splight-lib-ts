import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export type Graph = {
  id: string;
  title: string;
  description: string;
};

export interface GraphParams {
  title: string;
  description?: string;
}

export interface EdgeParams {
  directed: boolean;
  graph_id: string;
  asset_id: string;
  source_id: string;
  target_id: string;
  color: string;
  source_handle: string;
  target_handle: string;
}
export interface Edge extends EdgeParams {
  id: string;
}

export interface NodeParams {
  type: string;
  position_x: string;
  position_y: string;
  width: string;
  height: string;
  asset_id: string;
  color: string;
  text: string;
  fill_color: string;
}
export interface Node extends NodeParams {
  id: string;
}

export const GraphsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/graph/graphs/');
  const baseClient = BaseRestClient<GraphParams, Graph>(basePath, headers);
  return baseClient;
};
export const GraphNodesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/graph/nodes/');
  const baseClient = BaseRestClient<NodeParams, Node>(basePath, headers);
  return baseClient;
};
export const GraphsNodesBulkClient = (headers: Headers) => {
  const basePath = Path('v2/engine/graph/nodes/bulk/');
  const baseClient = BaseRestClient<NodeParams[], Node[]>(basePath, headers);
  return baseClient;
};
export const GraphEdgesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/graph/edges/');
  const baseClient = BaseRestClient<EdgeParams, Edge>(basePath, headers);
  return baseClient;
};
export const GraphsEdgesBulkClient = (headers: Headers) => {
  const basePath = Path('v2/engine/graph/edges/bulk/');
  const baseClient = BaseRestClient<EdgeParams[], Edge[]>(basePath, headers);
  return baseClient;
};
