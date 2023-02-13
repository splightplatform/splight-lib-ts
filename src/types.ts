export type Input<T> = Omit<T, "id">;

export type Headers = Record<string, string>;

export interface PaginatedCollection<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Attribute {
  id: string;
  name: string;
}

export interface File {
  id: string;
  file: string;
  description: string;
  url: string;
  extension: string;
  encrypted: boolean;
}

export interface Asset {
  id: string;
  name: string;
  verified?: boolean;
  description?: string;
  attributes?: Attribute[];
  latitude?: number;
  longitude?: number;
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface ComponentObject {
  id: string;
  name: string;
  description: string;
  component_id: string;
  data: ComponentParameter[];
}

export interface Binding {
  name: string;
  object_type: string;
  object_action: "CREATE" | "UPDATE" | "DELETE";
}

export interface ComponentCommand {
  name: string;
  fields: ComponentParameter[];
}

interface Endpoint {
  name: string;
  port: number;
}

export enum ComponentSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  VERY_LARGE = "very_large",
}

export interface ObjectParameter {
  name: string;
  id: string;
}

export type ComponentParameterType =
  | string
  | number
  | boolean
  | ObjectParameter;

export interface ComponentParameter {
  type: string;
  name: string;
  required: boolean;
  value:
    | ComponentParameterType
    | ComponentParameterType[]
    | ComponentParameter[]
    | ComponentParameter[][]
    | ObjectParameter
    | ObjectParameter[]
    | ObjectParameter[][];
  fields?: OutputField[];
  multiple: boolean;
  choices?: Array<string | number>;
  depends_on?: string;
}

export interface OutputField {
  name: string;
  type: string;
  filterable?: boolean;
  depends_on?: string;
}
export interface CustomType {
  name: string;
  fields: ComponentParameter[];
}

export interface Component {
  id: string;
  name: string;
  description: string;
  version: string;
  readme: string;
  readme_text?: string;
  custom_types: CustomType[];
  input: ComponentParameter[];
  output: ComponentParameter[];
  filters?: ComponentParameter[];
  type?: string;
  verification: string;
  impact?: number;
  picture_url?: string;
  last_modified: string;
  privacy_policy?: string;
  tags: string[];
  build_status: string;
  status: string;
  service_name: string;
  component_capacity?: string;
  log_level?: number;
  restart_policy?: string;
  organization_id?: string;
  usage_count?: number;
  bindings?: Binding[];
  commands?: ComponentCommand[];
  endpoints?: Endpoint[];
  min_component_capacity: ComponentSize;
}
