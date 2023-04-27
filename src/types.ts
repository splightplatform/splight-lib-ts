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

export { Asset, AssetParams } from './engine/assets/Assets.js';
export { Attribute, AttributeParams } from './engine/attributes/Attributes.js';
export { Secret, SecretParams } from './engine/secrets/Secrets.js';
export {
  Component,
  ComponentParams,
  ComponentParameter,
  ComponentCommand,
  ComponentParameterType,
  ComponentObject,
  Command,
  CommandParams,
  ComponentSize,
  ComponentObjectParams,
  ObjectParameter,
  DeploymentType,
} from './engine/components/Components.js';
export { File, FileParams } from './engine/files/Files.js';
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
  MathItem,
  DataAddress,
} from './engine/alerts/Alerts.js';

export {
  PaymentAccount,
  PayoutAccount,
  Coupon,
  Discount,
  Subscription,
  ExternalPortalLink,
} from './account/Billing.js';
export { SetPoint as Setpoint } from './engine/SetPoints.js';
export { Component as HubComponent } from './hub/components/Components.js';
export { OrganizationProfile } from './backoffice/Organizations.js';
export {
  Agreement,
  AgreementParams,
} from './backoffice/agreements/Agreements.js';
export {
  Agreement as AccountAgreement,
  AgreementParams as AccountAgreementParams,
} from './account/Agreements.js';
export { UserActivity } from './account/Activity.js';
export { UserInvitation } from './account/UserInvitations.js';
export { Referral } from './account/Referral.js';
