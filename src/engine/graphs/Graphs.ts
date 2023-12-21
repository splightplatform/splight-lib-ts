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
