// Components

import { get } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, PaginatedCollection } from '../../types.js';
import { Path } from '../../Urls.js';

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
  object_action: 'CREATE' | 'UPDATE' | 'DELETE';
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
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  VERY_LARGE = 'very_large',
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

export interface ComponentParams {
  name: string;
  description?: string;
  picture_url?: string;
  log_level: LogLevel;
  component_capacity: ComponentSize;
  restart_policy: RestartPolicy;
  version: string;
  custom_types?: CustomType[];
  input?: ComponentParameter[];
  commands?: ComponentCommand[];
  endpoints?: Endpoint[];
  active?: boolean;
}

export type RestartPolicy = 'Always' | 'OnFailure' | 'Never';

export type LogLevel = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export const ComponentsClient = (headers: Headers) => {
  const basePath = Path('v2/hub/component/components/');
  const componentVersionsPath = Path('v2/hub/all/component-versions/');
  const baseClient = BaseRestClient<ComponentParams, Component>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    versions: (params?: { name: string }) =>
      get<PaginatedCollection<Component>>(
        componentVersionsPath.url,
        headers,
        params
      ),
  };
};
