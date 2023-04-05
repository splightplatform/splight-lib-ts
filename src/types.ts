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

export type Graph = {
  id: string;
  title: string;
  description: string;
};

export interface Edge {
  id?: string;
  directed: boolean;
  graph_id: string;
  asset_id: string;
  source_id: string;
  target_id: string;
  color: string;
  source_handle: string;
  target_handle: string;
}

export interface Node {
  id: string;
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

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  created_at: string;
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

export interface Query {
  id?: string;
  source_type: string;
  name: string;
  description: string;
  output_format: string;
  target: string;
  source_component_id: string | null;
  source_component_label: string | null;
  filters: { [key: string]: string };
  limit?: number;
  skip?: number;
  source?: string;
  sort?: string;
  add_fields?: string;
  group_id?: string;
  group_fields?: string;
  rename_fields?: string;
  project_fields?: string;
  timezone_offset?: number;
  query_params?: string;
}

export interface Secret {
  id: string;
  name: string;
  value: string;
}

export interface Notification {
  id: string;
  message: string;
  target_id?: string;
  target_type?: string;
  redirect_url?: string;
  volatile?: boolean;
  created_at?: string;
  source_id?: string;
  source_type?: string;
  title?: string;
  seen?: boolean;
  scope?: string;
  isError?: boolean;
  timeAliveInMs?: number;
}

export type Empty = Record<string, never>;
export type AsyncFunction<T extends unknown[], R> = (...args: T) => Promise<R>;
