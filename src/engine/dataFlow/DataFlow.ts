type NodeType =
  | 'Asset'
  | 'Attribute'
  | 'Function'
  | 'RoutineObject'
  | 'Component'
  | 'Command';

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
