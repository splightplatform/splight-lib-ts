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
  AssetParams,
  GetAttributeParams,
  GetAttribute,
  SetAttributeCsvParams,
  BaseRelatedAssetObj,
} from './engine/assets/Assets.js';

export {
  SplightComment,
  SplightCommentParams,
} from './engine/comments/Comments.js';

export {
  Attribute,
  AttributeParams,
  RelationshipGraph,
  RelationshipEdge,
  RelationshipNode,
} from './engine/attributes/Attributes.js';
export {
  Metadata,
  MetadataParams,
  MetadataRelationships,
} from './engine/metadata/Metadata.js';
export {
  Secret,
  SecretParams,
  DecryptSecretParams,
} from './engine/secrets/Secrets.js';
export {
  LogLevel,
  RestartPolicy,
  Component,
  ComponentParams,
  Routine,
  RoutineObject,
  RoutineObjectParams,
  RoutineEvaluation,
  Command,
  CommandParams,
  ComponentObjectParams,
  DeploymentType,
} from './engine/components/Components.js';
export {
  _File as File,
  FileParams,
  Folder,
  FolderParams,
  FileSystemObject,
  FileSystemFolder,
} from './engine/files/Files.js';
export {
  LineInterpolationStyle,
  Orientation,
  TimeSeriesType,
  ValueMappingType,
  ValueMapping,
  ExactMatchValueMapping,
  RangeValueMapping,
  RegexValueMapping,
  ChartItemType,
  ChartTypes,
  ChartItemTypes,
  LineInterpolationStyleTypes,
  OrientationTypes,
  TimeSeriesTypes,
  ValueMappingTypes,
  Threshold,
  ChartItemBase,
  ExpressionChartItem,
  QueryChartItem,
  ChartItem,
  ChartBase,
  ChartType,
  ChartParams,
  Chart,
  DataChart,
  SimpleChart,
  ResoruceChart,
  Aggregation,
  Dashboard,
  BarChart,
  ImageChart,
  TextChart,
  StatChart,
  AlertListChart,
  AssetListChart,
  AlertEventsChart,
  TimeseriesChart,
  BarGaugeChart,
  GaugeChart,
  TableChart,
  TabParams,
} from './engine/dashboards/Dashboards.js';
export { EdgeParams, NodeParams } from './engine/graphs/Graphs.js';

export {
  CronAlert,
  RateAlert,
  CronAlertParams,
  RateAlertParams,
  AlertParams,
  AlertEvent,
  AlertEvaluation,
  AlertItem,
  AlertThreshold,
} from './engine/alerts/Alerts.js';

export {
  HubComponent,
  ComponentSize,
  ComponentParameter,
  ComponentCommand,
  ObjectParameter,
  BaseComponentResource,
  ComponentObject,
  ComponentParameterType,
  DataAddressValue,
  TypedComponentParameter,
} from './hub/components/Components.js';

export {
  PaymentAccount,
  PayoutAccount,
  Coupon,
  Discount,
  Subscription,
  ExternalPortalLink,
} from './account/Billing.js';

export {
  Contract as AccountContract,
  ContractParams as AccountContractParams,
} from './account/Contracts.js';

export { UserActivity } from './account/Activity.js';
export { UserInvitation } from './account/UserInvitations.js';

export { CapacityOptions } from './engine/Deployments.js';
export {
  CronFunctionParams,
  RateFunctionParams,
  RateFunction,
  CronFunction,
  FunctionEvaluation,
  FunctionItem,
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
  SearchDataResponse,
  SearchDataParams,
} from './engine/datalake/Data.js';

export {
  UserLogs,
  UserLogsDetails,
  OrganizationProfile,
} from './account/Users.js';

export {
  Permission,
  PermissionParams,
  Role,
  RoleParams,
  Application,
  Service,
  Action,
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
  ProvisionData,
  ItemProvisionData,
  ItemProvisionDataName,
} from './account/Provision.js';

export {
  ComputeNode,
  ComputeNodeParams,
  ComputeNodeUsage,
} from './engine/computeNodes/ComputeNodes.js';

export { AgentRelease } from './agent/release/Release.js';
export { MOCK_MODE_KEY } from './constants/mockMode.js';

// Weather
export {
  CurrentWeather,
  DailyForecast,
  HourlyForecast,
} from './engine/weather/Weather.js';

export { LogEntry } from './engine/logs/Logs.js';
