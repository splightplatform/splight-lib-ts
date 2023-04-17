import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, Optional, PaginatedCollection } from '../../types.js';
import { Path } from '../../Urls.js';

// Components
export interface ComponentObject {
  id: string;
  name: string;
  description: string;
  component_id: string;
  type?: string;
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

interface CommandResponse {
  id: string;
  return_value: string;
  error_detail: string;
}

export interface Command {
  id: string;
  description: string;
  status: string;
  component_id: string;
  fields?: ComponentParameter[];
  command: ComponentCommand;
  response?: CommandResponse;
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
  description: string;
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

export interface Deployment {
  component_id: string;
  capacity?: string;
  log_level?: number;
  status: string;
  restart_policy?: string;
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
  filters?: ComponentParameter[];
  type?: string;
  verification: string;
  impact?: number;
  picture_url?: string;
  last_modified: string;
  privacy_policy?: string;
  tags: string[];
  build_status: string;
  output: ComponentParameter[];
  service_name: string;
  deployment_capacity?: string;
  deployment_log_level?: number;
  deployment_status: string;
  deployment_restart_policy?: string;
  connections_active: boolean;
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
  type?: string;
  version: string;
  custom_types?: CustomType[];
  input?: ComponentParameter[];
  output: ComponentParameter[];
  commands?: ComponentCommand[];
  bindings?: Binding[];
  endpoints?: Endpoint[];
  active?: boolean;
  deployment_log_level?: LogLevel;
  deployment_restart_policy?: RestartPolicy;
  deployment_capacity: ComponentSize;
}

export type RestartPolicy = 'Always' | 'OnFailure' | 'Never';

export type LogLevel = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export type CommandParams = Optional<Command, 'fields' | 'id' | 'status'>;

export type ComponentObjectParams = Optional<
  Omit<ComponentObject, 'id'>,
  'description'
>;

export const ComponentsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/component/components/');
  const baseClient = BaseRestClient<ComponentParams, Component>(
    basePath,
    headers
  );

  const fromHubComponent = (
    name: string,
    description: string,
    component: Component
  ) => {
    const new_component: ComponentParams = {
      name,
      description,
      deployment_capacity: component.min_component_capacity,
      custom_types: component.custom_types,
      picture_url: component.picture_url,
      input: component.input,
      output: component.output,
      type: component.type,
      version: `${component.name}-${component.version}`,
      bindings: component.bindings,
      commands: component.commands,
      endpoints: component.endpoints,
    };
    return post<ComponentParams, Component>(
      basePath.url,
      new_component,
      headers
    );
  };

  return {
    ...baseClient,
    fromHubComponent,
    hubComponent: (pk: string) =>
      get<Component>(basePath.slash(pk).slash('hub-component').url, headers),
    start: (pk: string) =>
      post<Record<string, never>, Deployment>(
        basePath.slash(pk).slash('start').url,
        {},
        headers
      ),
    stop: (pk: string) =>
      post(basePath.slash(pk).slash('stop').url, {}, headers),
    objects: (
      pk: string,
      params: { page?: number; page_size?: number; component_id?: string }
    ) =>
      get<PaginatedCollection<ComponentObject>>(
        Path('v2/engine/component/objects/').url,
        headers,
        params
      ),
    commands: (pk: string) =>
      get<ComponentCommand[]>(
        basePath.slash(pk).slash('commands').url,
        headers
      ),
  };
};

export const ComponentCommandsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/component/commands/');
  const baseClient = BaseRestClient<CommandParams, Command>(basePath, headers);
  return baseClient;
};

export const ComponentObjectsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/component/objects/');
  const baseClient = BaseRestClient<ComponentObjectParams, ComponentObject>(
    basePath,
    headers
  );
  return baseClient;
};
