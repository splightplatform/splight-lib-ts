import { get } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface AttributeParams {
  name: string;
  pinned_at?: string | null;
  asset?: string;
  type?: string;
}

export interface Attribute extends AttributeParams {
  id?: string;
}

type NodeType =
  | 'Asset'
  | 'Attribute'
  | 'Function'
  | 'RoutineObject'
  | 'Component';
export interface RelationshipNode {
  id: string;
  type: NodeType;
  data: {
    id: string;
    name: string;
    [key: string]: string;
  };
}

export interface RelationshipEdge {
  id: string;
  source: string;
  sourceType: NodeType;
  target: string;
  targetType: NodeType;
}

export interface RelationshipGraph {
  nodes: RelationshipNode[];
  edges: RelationshipEdge[];
}

export const AttributesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/attributes/');
  const baseClient = BaseRestClient<AttributeParams, Attribute>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    relationships: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<RelationshipGraph>(
        basePath.slash(pk).slash('relationships').url,
        headers,
        params
      ),
    data: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<RelationshipGraph>(
        basePath.slash(pk).slash('data').url,
        headers,
        params
      ),
  };
};
