export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Input<
  T,
  ReadOnlyField extends keyof T,
  OptionalField extends keyof Omit<T, ReadOnlyField>
> = Optional<Omit<T, ReadOnlyField>, OptionalField>;

export type Headers = Record<string, string>;

export type WithoutPagination<T> = T extends BasePaginatedCollection<infer U>
  ? U
  : T;

export type WithContainsFilters<T> = T extends { name: string }
  ? T & { name__contains: string; name__icontains: string }
  : T;

export interface BaseListParams {
  page?: number;
  page_size?: number;
  ordering?: string;
}
export type Params<T> = BaseListParams & Partial<WithContainsFilters<T>>;

export interface BasePaginatedCollection<T> {
  count: number;
  next: string;
  next_page?: number;
  previous: string | null;
  previous_page?: number;
  results: T[];
}

export interface PaginatedCollection<T> extends BasePaginatedCollection<T> {
  getNext: (headers: Headers) => Promise<PaginatedCollection<T>>;
}

export interface Filter extends AbstractComplexConfiguration {
  _id?: string;
  key: string;
  value: string | number | boolean;
}
export type FilterGroup = Filter[];

interface AbstractComplexConfiguration {
  _meta: { valueLabel: string };
}
export interface OutputSource extends AbstractComplexConfiguration {
  value: string | null | undefined;
}

export type Empty = Record<string, never>;
export type AsyncFunction<T extends unknown[], R> = (...args: T) => Promise<R>;

export { Organization, UserProfile } from './account/User.js';

export {
  Asset,
  AssetKind,
  AssetKindParams,
  AssetParams,
  BaseRelatedAssetObj,
  GetAttribute,
  GetAttributeParams,
  SetAttributeCsvParams,
} from './engine/assets/Assets.js';

export {
  AssetRelation,
  AssetRelationParam,
} from './engine/assetRelations/AssetRelations.js';

export {
  SplightComment,
  SplightCommentParams,
} from './engine/comments/Comments.js';

export {
  AssetAction,
  AssetActionEvent,
  AssetActionSetpoint,
} from './engine/actions/Actions.js';
export {
  Attribute,
  AttributeParams,
  DataFlowEdge,
  DataFlowGraph,
  DataFlowNode,
} from './engine/attributes/Attributes.js';
export {
  Component,
  ComponentEvent,
  ComponentObjectParams,
  ComponentParams,
  DeploymentType,
  LogLevel,
  RestartPolicy,
  Routine,
  RoutineEvaluation,
  RoutineObject,
  RoutineObjectParams,
} from './engine/components/Components.js';
export {
  Aggregation,
  AlertEventsChart,
  AlertListChart,
  AssetListChart,
  BarChart,
  BarGaugeChart,
  Chart,
  ChartBase,
  ChartItem,
  ChartItemBase,
  ChartItemType,
  ChartItemTypes,
  ChartParams,
  ChartType,
  ChartTypes,
  Dashboard,
  DataChart,
  ExactMatchValueMapping,
  ExpressionChartItem,
  GaugeChart,
  HistogramChart,
  HistogramType,
  HistogramTypes,
  ImageChart,
  LineInterpolationStyle,
  LineInterpolationStyleTypes,
  Orientation,
  OrientationTypes,
  Placement,
  QueryChartItem,
  RangeValueMapping,
  RegexValueMapping,
  ResoruceChart,
  SimpleChart,
  SortingType,
  SortingTypes,
  StatChart,
  TabParams,
  TableChart,
  TextChart,
  Threshold,
  TimeSeriesType,
  TimeSeriesTypes,
  TimeseriesChart,
  ValueMapping,
  ValueMappingType,
  ValueMappingTypes,
} from './engine/dashboards/Dashboards.js';
export {
  _File as File,
  FileParams,
  FileSystemObject,
  _Folder as Folder,
  FolderParams,
} from './engine/files/Files.js';
export { EdgeParams, NodeParams } from './engine/graphs/Graphs.js';
export {
  Metadata,
  MetadataParams,
  MetadataRelationships,
} from './engine/metadata/Metadata.js';
export {
  DecryptSecretParams,
  Secret,
  SecretParams,
} from './engine/secrets/Secrets.js';

export {
  AlertEvaluation,
  AlertEvent,
  AlertItem,
  AlertParams,
  AlertThreshold,
  CronAlert,
  CronAlertParams,
  RateAlert,
  RateAlertParams,
} from './engine/alerts/Alerts.js';

export {
  BaseComponentResource,
  ComponentObject,
  ComponentParameter,
  ComponentParameterType,
  ComponentSize,
  DataAddressValue,
  MetadataValue,
  HubComponent,
  ObjectParameter,
  TypedComponentParameter,
} from './hub/components/Components.js';

export {
  Coupon,
  Discount,
  ExternalPortalLink,
  PaymentAccount,
  PayoutAccount,
  Subscription,
} from './account/Billing.js';

export {
  Contract as AccountContract,
  ContractParams as AccountContractParams,
} from './account/Contracts.js';

export { UserActivity } from './account/Activity.js';
export { UserInvitation } from './account/UserInvitations.js';

export { CapacityOptions } from './engine/Deployments.js';
export {
  AsyncExecutionParams,
  CronFunction,
  CronFunctionParams,
  FunctionEvaluation,
  FunctionEvent,
  FunctionItem,
  FunctionsParams,
  RateFunction,
  RateFunctionParams,
} from './engine/functions/Functions.js';

export interface ApiFormField {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  min_length?: number;
  max_length?: number;
  choices?: [{ value: string; display_name: string }];
}

export {
  DataRecord,
  DataRecords,
  DataRequest,
} from './engine/datalake/Data.js';

export {
  OrganizationProfile,
  UserLogs,
  UserLogsDetails,
} from './account/Users.js';

export {
  Action,
  Application,
  Permission,
  PermissionParams,
  Role,
  RoleParams,
  Service,
  SsoRoleMapping,
  SsoRoleMappingParams,
} from './account/Roles.js';

export {
  EmailIntegration,
  EmailIntegrationParams,
  Integration,
  TelegramIntegration,
  TelegramIntegrationParams,
} from './account/Integrations.js';

export {
  ItemProvisionData,
  ItemProvisionDataName,
  ProvisionData,
} from './account/Provision.js';

export {
  ComputeNode,
  ComputeNodeParams,
  ComputeNodeUsage,
} from './engine/computeNodes/ComputeNodes.js';

export { AgentRelease } from './plugin/agent/release/Release.js';

// Weather
export {
  CurrentWeather,
  DailyForecast,
  HourlyForecast,
} from './plugin/weather/Weather.js';

export { LogEntry } from './engine/logs/Logs.js';
export {
  Solution,
  SolutionParams,
  SolutionPlan,
  SolutionResource,
} from './engine/solutions/Solutions.js';
export { HubSolution, HubSolutionParams } from './hub/solutions/Solutions.js';

export { Tag, TagParams } from './account/Tags.js';

export {
  Command,
  CommandEvent,
  CommandParams,
} from './engine/commands/Commands.js';
