// Components
import { AxiosProgressEvent } from 'axios';
import { Path } from '../../Urls.js';
import { get } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';

export interface BaseComponentResource {
  id: string;
  name: string;
  description: string;
  component_id: string;
  type: string;
}

export interface ComponentObject extends BaseComponentResource {
  data: ComponentParameter[];
}

export interface DataAddressValue {
  asset: string;
  attribute: string;
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

export interface Endpoint {
  name: string;
  port: number;
}

export enum ComponentSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  VERY_LARGE = 'very_large',
}

export interface DataAddressValue {
  asset: string;
  attribute: string;
}

export interface ObjectParameter {
  name: string;
  id: string;
  original_value?: string | DataAddressValue;
}

export type ComponentParameterType =
  | string
  | number
  | boolean
  | DataAddressValue
  | ObjectParameter;

export interface ComponentParameter {
  id?: string;
  type: string;
  name: string;
  description: string;
  required: boolean;
  value:
    | ComponentParameterType
    | ComponentParameterType[]
    | ComponentParameter[]
    | ComponentParameter[][];
  fields?: OutputField[];
  multiple: boolean;
  choices?: Array<string | number>;
  depends_on?: string;
}

export interface TypedComponentParameter extends ComponentParameter {
  value_type?: string;
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

export interface HubComponent {
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
  component_type?: string;
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
  organization?: { id: string; name: string };
  usage_count?: number;
  bindings?: Binding[];
  commands?: ComponentCommand[];
  endpoints?: Endpoint[];
  min_component_capacity: ComponentSize;
  splight_cli_version: string | null;
  splight_lib_version: string | null;
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

export interface HubURL {
  url: string;
}

export type RestartPolicy = 'Always' | 'OnFailure' | 'Never';

export type LogLevel = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export const ComponentVersionsClient = (headers: Headers) => {
  const basePath = Path('v2/hub/component/versions/');
  const baseClient = BaseRestClient<HubComponent>(basePath, headers);
  return {
    ...baseClient,
    buildLogs: (pk: string) =>
      get<string[]>(basePath.slash(pk).slash('build-logs').url, headers),
    downloadURL: (pk: string, type: string) =>
      get<HubURL>(basePath.slash(pk).slash('download_url').url, headers, {
        type: type,
      }),
    download: (
      pk: string,
      type: string,
      onDownloadProgress?: (progress: AxiosProgressEvent) => void
    ) =>
      get<HubURL>(basePath.slash(pk).slash('download_url').url, headers, {
        type: type,
      }).then((response) =>
        get<Blob>(response.url, {}, {}, 'blob', onDownloadProgress)
      ),
  };
};

export const ComponentsClient = (headers: Headers) => {
  const basePath = Path('v2/hub/component/components/');
  const baseClient = BaseRestClient<ComponentParams, HubComponent>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    buildLogs: (pk: string) =>
      get<string[]>(basePath.slash(pk).slash('build-logs').url, headers),
    versions: ComponentVersionsClient(headers),
  };
};
