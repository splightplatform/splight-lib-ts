export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Input<
  T,
  ReadOnlyField extends keyof T,
  OptionalField extends keyof Omit<T, ReadOnlyField>
> = Optional<Omit<T, ReadOnlyField>, OptionalField>;

export type Headers = Record<string, string>;

export type WithoutPagination<T> = T extends PaginatedCollection<infer U>
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

export interface PaginatedCollection<T> {
  count: number;
  next: string;
  previous: string | null;
  results: T[];
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

export { Organization } from './account/Me.js';

export {
  Asset,
  AssetParams,
  GetAttributeParams,
  GetAttribute,
} from './engine/assets/Assets.js';
export {
  Attribute,
  AttributeParams,
  AttributeRelationships,
} from './engine/attributes/Attributes.js';
export { Secret, SecretParams } from './engine/secrets/Secrets.js';
export {
  LogLevel,
  RestartPolicy,
  Component,
  ComponentParams,
  ComponentParameter,
  ComponentCommand,
  ComponentParameterType,
  ComponentObject,
  Routine,
  RoutineObject,
  RoutineObjectParams,
  DataAddressValue,
  Command,
  CommandParams,
  ComponentSize,
  ComponentObjectParams,
  ObjectParameter,
  DeploymentType,
  ComponentLogEntry,
} from './engine/components/Components.js';
export { _File as File, FileParams } from './engine/files/Files.js';
export { Query, QueryParams } from './engine/queries/Queries.js';
export {
  EdgeParams,
  NodeParams,
  TabParams,
} from './engine/dashboards/Dashboards.js';

export {
  Alert,
  AlertParams,
  Condition,
  Variable,
  PopulatedVariable,
  MathItem,
  DataAddress,
  PopulatedDataAddress,
  AlertHistory,
} from './engine/alerts/Alerts.js';

export { Component as HubComponent } from './hub/components/Components.js';

export {
  PaymentAccount,
  PayoutAccount,
  Coupon,
  Discount,
  Subscription,
  ExternalPortalLink,
} from './account/Billing.js';

export {
  OrganizationProfile,
  OrganizationCompute,
  OrganizationDatalake,
  OrganizationAlerts,
} from './backoffice/organizations/Organizations.js';
export { Contract, ContractParams } from './backoffice/contracts/Contracts.js';

export {
  Contract as AccountContract,
  ContractParams as AccountContractParams,
} from './account/Contracts.js';

export { UserActivity } from './account/Activity.js';
export { UserInvitation } from './account/UserInvitations.js';

export { Contact } from './landing/Contact.js';
export { Newsletter } from './landing/Newsletter.js';

export { CapacityOptions } from './engine/Deployments.js';

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

export { UserLogs, UserLogsDetails } from './account/Users.js';

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
