import { BaseRestClient } from "../../rest/BaseRestClient.js";
import { Headers } from "../../types.js";
import { Path } from "../../Urls.js";

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

interface Filter {
  id?: string;
  operator: string;
  key: string;
  value: string | number | boolean;
  label: string;
}

interface AdvancedFilter {
  id?: string;
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
  position?: {
    x: string;
    y: string;
  };
  width?: string;
  height?: string;
}

export interface Chart {
  id: string;
  name: string;
  type: string;
  position_x: number;
  position_y: number;
  height: number;
  width: number;
  min_height: number;
  min_width: number;
  asset_id: string;
  attribute_id: string;
  timeConfiguration: Configuration;
  chartItems: ChartItem[];
  description: string;
  externalResource: string;
  external_resource?: string;
  external_resource_type?: string;
  items: ChartItem[];
  config: Record<string, string>;
  last_updated_by?: string;
  tab: string;
}

interface TabParams {
  name: string;
  dashboard: string;
}
interface Tab extends TabParams {
  id: string;
  charts: Chart[];
}

export const DashboardTabsClient = (headers: Headers) => {
  const basePath = Path("engine/dashboards/tabs/");
  const baseClient = BaseRestClient<
    { name: string; dashboard: string },
    Dashboard
  >(basePath, headers);
  return baseClient;
};

export const DashboardsClient = (headers: Headers) => {
  const basePath = Path("engine/dashboards/");
  const baseClient = BaseRestClient<DashboardParams, Dashboard>(
    basePath,
    headers
  );
  return { ...baseClient, tabs: DashboardTabsClient(headers) };
};
