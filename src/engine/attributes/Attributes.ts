import { get } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface AttributeParams {
  name: string;
  pinned_at?: string | null;
  asset?: string;
  type?: string;
  unit?: string;
}

export interface Attribute extends AttributeParams {
  id?: string;
  status: string;
}

type NodeType =
  | 'Asset'
  | 'Attribute'
  | 'Function'
  | 'RoutineObject'
  | 'Component';

export interface DataFlowNode {
  id: string;
  node_type: NodeType;
  name: string;
  [key: string]: string;
}

export interface DataFlowEdge {
  id: string;
  source: string;
  sourceType: NodeType;
  target: string;
  targetType: NodeType;
}

export interface DataFlowGraph {
  nodes: DataFlowNode[];
  edges: DataFlowEdge[];
}

export const AttributesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/asset/attributes/');
  const baseClient = BaseRestClient<AttributeParams, Attribute>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    dataFlow: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<DataFlowGraph>(
        basePath.slash(pk).slash('data-flow').url,
        headers,
        params
      ),
    data: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<DataFlowGraph>(basePath.slash(pk).slash('data').url, headers, params),
  };
};
