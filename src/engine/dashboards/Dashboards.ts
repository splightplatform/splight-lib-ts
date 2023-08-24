import { post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface DashboardParams {
  name: string;
  description?: string;
}

export interface Dashboard extends DashboardParams {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface Configuration {
  start?: string;
  end?: string;
  refreshInterval?: string;
  relativeStartTime?: string;
}

export interface Filter {
  id?: string;
  chart_item?: string;
  operator: string;
  key: string;
  value: string | number | boolean;
  label: string;
}

export interface AdvancedFilter {
  id?: string;
  chart_item?: string;
  field: string;
  key: string;
  value: string;
  operator: string;
}

export interface ChartItem {
  id?: string;
  ref_id: string;
  type: string;
  color: string;
  order: number;
  hidden: boolean;
  label: string;
  expression: string;
  expression_plain: string | null;
  query_filter_asset: {
    id: string;
    name?: string;
  } | null;
  query_filter_attribute: {
    id: string;
    name?: string;
  } | null;
  query_group_unit: string;
  query_group_function: string;
  query_sort_field: string;
  query_sort_direction: number;
  query_limit: number;
  query_plain: string | null;
  query_params?: string;
  position_x?: number;
  position_y?: number;
  width?: string;
  height?: string;
}

export interface ChartParams {
  description?: string;
  tab: string;
  type: string;
  name: string;
  chart_items: ChartItem[];
  refresh_interval: string | null;
  relative_window_time: string | null;
  position_x: number;
  position_y: number;
  height: number;
  width: number;
  min_height?: number;
  min_width?: number;
}
export interface Chart extends ChartParams {
  id: string;
  name: string;
  asset_id: string;
  attribute_id: string;
  timeConfiguration: Configuration;
  externalResource: string;
  external_resource?: string;
  external_resource_type?: string;
  config: Record<string, string>;
  last_updated_by?: string;
  timestamp_gte: string;
  timestamp_lte: string;
}

export interface TabParams {
  name: string;
  dashboard: string;
  order: number;
}

export interface Tab extends TabParams {
  id: string;
  charts: Chart[];
}

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

export const DashboardTabsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/dashboard/tabs/');
  const baseClient = BaseRestClient<TabParams, Tab>(basePath, headers);
  return baseClient;
};
export const DashboardChartsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/dashboard/charts/');
  const baseClient = BaseRestClient<ChartParams, Chart>(basePath, headers);

  return baseClient;
};
export const DashboardChartItemsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/dashboard/chartitems/');
  const updateChartItemsPath = basePath.slash('update_chart_items');
  const baseClient = BaseRestClient<ChartItem, ChartItem>(basePath, headers);
  return {
    ...baseClient,
    bulkUpdate: (chartItems: ChartItem[]) =>
      post<{ chart_items: ChartItem[] }, ChartItem[]>(
        updateChartItemsPath.url,
        { chart_items: chartItems },
        headers
      ),
  };
};

export const DashboardsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/dashboard/dashboards/');
  const baseClient = BaseRestClient<DashboardParams, Dashboard>(
    basePath,
    headers
  );

  return baseClient;
};

export const DashboardGraphsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/dashboard/graphs/');
  const baseClient = BaseRestClient<GraphParams, Graph>(basePath, headers);
  return baseClient;
};
export const DashboardGraphNodesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/dashboard/nodes/');
  const baseClient = BaseRestClient<NodeParams, Node>(basePath, headers);
  return baseClient;
};
export const DashboardGraphsNodesBulkClient = (headers: Headers) => {
  const basePath = Path('v2/engine/dashboard/nodes/bulk/');
  const baseClient = BaseRestClient<NodeParams[], Node[]>(basePath, headers);
  return baseClient;
};
export const DashboardGraphEdgesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/dashboard/edges/');
  const baseClient = BaseRestClient<EdgeParams, Edge>(basePath, headers);
  return baseClient;
};
export const DashboardGraphsEdgesBulkClient = (headers: Headers) => {
  const basePath = Path('v2/engine/dashboard/edges/bulk/');
  const baseClient = BaseRestClient<EdgeParams[], Edge[]>(basePath, headers);
  return baseClient;
};
