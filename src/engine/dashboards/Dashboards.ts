import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, Tag } from '../../types.js';
import { Path } from '../../Urls.js';
import { BaseRelatedAssetObj } from '../assets/Assets.js';

export type Aggregation = 'avg' | 'sum' | 'min' | 'max' | 'last';
export type Placement = 'right' | 'bottom';
export type Orientation = 'horizontal' | 'vertical';
export type HistogramType = 'numerical' | 'categorical';
export type SortingType = 'alphabetical' | 'count';
export type LineInterpolationStyle = 'rounded' | 'rect' | 'squared';

export type ChartItemType = 'EXPRESSION' | 'QUERY';
export type TimeSeriesType = 'line' | 'bar';
export type ValueMappingType = 'exact_match' | 'range' | 'regex';

export const OrientationTypes = {
  HORIZONTAL: 'horizontal' as Orientation,
  VERTICAL: 'vertical' as Orientation,
};

export const HistogramTypes = {
  NUMERICAL: 'numerical' as HistogramType,
  CATEGORICAL: 'categorical' as HistogramType,
};

export const SortingTypes = {
  ALPHABETICAL: 'alphabetical' as SortingType,
  COUNT: 'count' as SortingType,
};

export const LineInterpolationStyleTypes = {
  ROUNDED: 'rounded' as LineInterpolationStyle,
  RECT: 'rect' as LineInterpolationStyle,
  SQUARED: 'squared' as LineInterpolationStyle,
};

export const ChartTypes = {
  IMAGE: 'image' as ChartType,
  TEXT: 'text' as ChartType,
  TIMESERIES: 'timeseries' as ChartType,
  BAR: 'bar' as ChartType,
  HISTOGRAM: 'histogram' as ChartType,
  TABLE: 'table' as ChartType,
  STAT: 'stat' as ChartType,
  GAUGE: 'gauge' as ChartType,
  BARGAUGE: 'bargauge' as ChartType,
  ALERTLIST: 'alertlist' as ChartType,
  ASSETLIST: 'assetlist' as ChartType,
  ALERTEVENTS: 'alertevents' as ChartType,
  COMMANDLIST: 'commandlist' as ChartType,
  ACTIONLIST: 'actionlist' as ChartType,
};

export const ChartItemTypes = {
  EXPRESSION: 'EXPRESSION' as ChartItemType,
  QUERY: 'QUERY' as ChartItemType,
  METADATA: 'METADATA' as ChartItemType,
};

export const TimeSeriesTypes = {
  LINE: 'line' as TimeSeriesType,
  BAR: 'bar' as TimeSeriesType,
};
export const ValueMappingTypes = {
  EXACT_MATCH: 'exact_match' as ValueMappingType,
  RANGE: 'range' as ValueMappingType,
  REGEX: 'regex' as ValueMappingType,
};

export interface DashboardParams {
  name: string;
  description?: string;
  pinned_at?: string | null;
  tags?: Tag[];
}

export interface Dashboard extends DashboardParams, BaseRelatedAssetObj {
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

export interface ChartItemBase {
  id?: string;
  ref_id: string;
  label: string;
  order: number;
  color: string;
  hidden: boolean;
  width?: string;
  height?: string;
}

export interface ExpressionChartItem extends ChartItemBase {
  type: 'EXPRESSION';
  expression: string;
  expression_plain: string;
}

export interface QueryChartItem extends ChartItemBase {
  type: 'QUERY';
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
  query_plain: string;
}

export type ChartItem = ExpressionChartItem | QueryChartItem;

interface ValueMappingBase {
  id?: string;
  type: ValueMappingType;
  order: number;
  display_text: string;
}

export interface ExactMatchValueMapping extends ValueMappingBase {
  match_value: string;
}
export interface RangeValueMapping extends ValueMappingBase {
  range_start: number;
  range_end: number;
}
export interface RegexValueMapping extends ValueMappingBase {
  regular_expression: string;
}

export type ValueMapping =
  | ExactMatchValueMapping
  | RangeValueMapping
  | RegexValueMapping;

export type Threshold = {
  id?: string;
  color: string;
  value: number;
  display_text: string;
};

export interface ChartParams {
  description?: string;
  tab: string;
  type: string;
  name: string;
  chart_items: ChartItem[];
  collection?: string;
  value_mappings: ValueMapping[];
  thresholds: Threshold[];
  refresh_interval: string | null;
  timestamp_gte: string | null;
  timestamp_lte: string | null;
  display_time_range: boolean;
  labels_aggregation?: Aggregation | null;
  labels_display: boolean;
  labels_placement: Placement;
  position_x: number;
  position_y: number;
  height: number;
  width: number;
  min_height?: number;
  min_width?: number;
  timezone?: string | null;
}

export interface ChartBase extends ChartParams {
  id: string;
  tab: string;
  name: string;
  relative_window_time?: string;
  last_updated_by?: string;
  show_beyond_data?: boolean;
}

export type DataChart =
  | BarChart
  | HistogramChart
  | GaugeChart
  | BarGaugeChart
  | TimeseriesChart
  | TableChart
  | StatChart;

export type SimpleChart = ImageChart | TextChart;
export type ResoruceChart = AlertListChart | AssetListChart | AlertEventsChart;

export interface BarChart extends ChartBase {
  type: 'bar';
  y_axis_max_limit: number;
  y_axis_min_limit: number;
  y_axis_unit: string;
  number_of_decimals?: number;
  orientation: Orientation;
}

export interface HistogramChart extends ChartBase {
  type: 'histogram';
  number_of_decimals?: number;
  bucket_count: number;
  bucket_size?: number;
  histogram_type: HistogramType;
  sorting?: SortingType;
  categories_top_max_limit?: number;
  stacked: boolean;
}

export interface ImageChart extends ChartBase {
  type: 'image';
  image_url?: File | null;
  image_file: string;
}

export interface TextChart extends ChartBase {
  type: 'text';
  text: string;
}

export interface StatChart extends ChartBase {
  type: 'stat';
  border: boolean;
  y_axis_unit: string;
  number_of_decimals?: number;
}

export interface AlertListChart extends ChartBase {
  type: 'alertlist';
  filter_name: string;
  filter_status: string[];
  alert_list_type: string;
}

export interface CommandListChart extends ChartBase {
  type: 'commandlist';
  filter_name: string;
}

export interface ActionListChart extends ChartBase {
  type: 'actionlist';
  filter_name: string;
  filter_asset: string;
}

export interface AssetListChart extends ChartBase {
  type: 'assetlist';
  filter_name: string;
  filter_status: string[];
  asset_list_type: string;
}

export interface AlertEventsChart extends ChartBase {
  type: 'alertevents';
  filter_name: string;
  filter_old_status: string[];
  filter_new_status: string[];
}

export interface TimeseriesChart extends ChartBase {
  type: 'timeseries';
  y_axis_max_limit: number;
  y_axis_min_limit: number;
  y_axis_unit: string;
  x_axis_format?: string | null;
  x_axis_auto_skip: boolean;
  x_axis_max_ticks_limit?: number | null;
  number_of_decimals?: number;
  line_interpolation_style: LineInterpolationStyle;
  timeseries_type: TimeSeriesType;
  fill: boolean;
  show_line: boolean;
}

export interface BarGaugeChart extends ChartBase {
  type: 'bargauge';
  max_limit?: number;
  number_of_decimals?: number;
  orientation: Orientation;
}

export interface GaugeChart extends ChartBase {
  type: 'gauge';
  max_limit?: number;
  number_of_decimals?: number;
}

export interface TableChart extends ChartBase {
  type: 'table';
  y_axis_unit: string;
  number_of_decimals?: number;
}

export type Chart =
  | ImageChart
  | TextChart
  | StatChart
  | AlertListChart
  | AssetListChart
  | ActionListChart
  | CommandListChart
  | AlertEventsChart
  | TableChart
  | TimeseriesChart
  | BarChart
  | HistogramChart
  | BarGaugeChart
  | GaugeChart;

export type ChartType = Chart['type'];

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
  return {
    ...baseClient,
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
