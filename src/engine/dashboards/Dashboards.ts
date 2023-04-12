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
  id: string;
  color: string;
  order: number;
  label: string;
  source?: string;
  source_type: string;
  source_component_id?: string | null;
  source_component_label: string;
  output_format: string;
  target: string;
  aggregate_criteria: string;
  aggregate_period: string;
  filters: Filter[];
  advanced_filters: AdvancedFilter[];
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
  chartItems: ChartItem[];
  externalResource: string;
  external_resource?: string;
  external_resource_type?: string;
  items: ChartItem[];
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
  const baseClient = BaseRestClient<ChartItem, ChartItem>(basePath, headers);
  return baseClient;
};
export const DashboardChartFilters = (headers: Headers) => {
  const basePath = Path('v2/engine/dashboard/filters/');
  const baseClient = BaseRestClient<Filter, Filter>(basePath, headers);
  return baseClient;
};
export const DashboardChartAdvancedFilters = (headers: Headers) => {
  const basePath = Path('v2/engine/dashboard/advancedfilters/');
  const baseClient = BaseRestClient<AdvancedFilter, AdvancedFilter>(
    basePath,
    headers
  );
  return baseClient;
};

export const DashboardsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/dashboard/dashboards/');
  const baseClient = BaseRestClient<DashboardParams, Dashboard>(
    basePath,
    headers
  );
  return baseClient;
};
