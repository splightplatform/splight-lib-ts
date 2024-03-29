import {
  BaseComponentResource,
  Binding,
  ComponentCommand,
  ComponentObject,
  ComponentParameter,
  ComponentSize,
  CustomType,
  Endpoint,
  HubComponent,
} from '../../hub/components/Components.js';
import { get, post, patch } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import {
  Headers,
  ComputeNode,
  Optional,
  LogEntry,
  DataFlowGraph,
  Tag,
} from '../../types.js';
import { Path } from '../../Urls.js';

export interface RoutineObject extends BaseComponentResource {
  status?: string;
  config: ComponentParameter[];
  input: ComponentParameter[];
  output: ComponentParameter[];
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

export interface Routine {
  name: string;
  config: ComponentParameter[];
  input: ComponentParameter[];
  output: ComponentParameter[];
}

export interface Deployment {
  component_id: string;
  capacity?: string;
  log_level?: number;
  status: string;
  restart_policy?: string;
}

export interface ComponentConnections {
  subscription_count: number;
  occupied: boolean;
}

export interface Component {
  id: string;
  name: string;
  description: string;
  version: string;
  readme: string;
  readme_text?: string;
  custom_types: CustomType[];
  routines: Routine[];
  input: ComponentParameter[];
  filters?: ComponentParameter[];
  type?: string;
  verification: string;
  impact?: number;
  picture_url?: string;
  last_modified: string;
  privacy_policy?: string;
  build_status: string;
  output: ComponentParameter[];
  service_name: string;
  deployment_type: DeploymentType;
  deployment_capacity?: string;
  deployment_log_level?: number;
  deployment_status: string;
  deployment_active: boolean;
  deployment_restart_policy?: string;
  connections_active: boolean;
  connections_updated_at: string;
  splight_cli_version: string | null;
  splight_lib_version: string | null;
  organization_id?: string;
  usage_count?: number;
  bindings?: Binding[];
  commands?: ComponentCommand[];
  endpoints?: Endpoint[];
  min_component_capacity: ComponentSize;
  hub_component: HubComponent;
  compute_node?: ComputeNode;
  pinned_at?: string | null;
  tags?: Tag[];
}

export interface ComponentParams {
  name: string;
  deployment_type: DeploymentType;
  description?: string;
  picture_url?: string;
  type?: string;
  version: string;
  routines?: Routine[];
  custom_types?: CustomType[];
  input?: ComponentParameter[];
  output: ComponentParameter[];
  commands?: ComponentCommand[];
  bindings?: Binding[];
  endpoints?: Endpoint[];
  active?: boolean;
  deployment_log_level?: LogLevel;
  deployment_restart_policy?: RestartPolicy;
  deployment_capacity?: ComponentSize;
  compute_node_id?: string;
  pinned_at?: string | null;
  tags?: Tag[];
}

export type ComponentEvent = {
  id: string;
  timestamp: string;
  old_status: string;
  new_status: string;
};

export type DeploymentType = 'SELF_HOSTED' | 'SPLIGHT_HOSTED';

export type RestartPolicy = 'Always' | 'OnFailure' | 'Never';

export type LogLevel = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export type CommandParams = Optional<Command, 'fields' | 'id' | 'status'>;

export type ComponentObjectParams = Optional<
  Omit<ComponentObject, 'id'>,
  'description'
>;

export type RoutineObjectParams = Optional<
  Omit<RoutineObject, 'id'>,
  'description'
>;

export type RoutineEvaluation = {
  timestamp: string;
  routine: string;
  status: string;
  status_text?: string;
};

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
      routines: component.routines,
      custom_types: component.custom_types,
      picture_url: component.picture_url,
      deployment_type: component.deployment_type,
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
      get<HubComponent>(basePath.slash(pk).slash('hub-component').url, headers),
    start: (pk: string) =>
      post<Record<string, never>, Component>(
        basePath.slash(pk).slash('start').url,
        {},
        headers
      ),
    stop: (pk: string) =>
      post<Record<string, never>, Component>(
        basePath.slash(pk).slash('stop').url,
        {},
        headers
      ),
    commands: (pk: string) =>
      get<ComponentCommand[]>(
        basePath.slash(pk).slash('commands').url,
        headers
      ),
    logs: (
      pk: string,
      params: {
        since?: string;
        until?: string;
        limit?: number;
        offset?: number;
      }
    ) =>
      /**
       * @remarks
       * The `since` and `until` parameters should be in ISO format
       */
      get<LogEntry[]>(
        basePath.slash(pk).slash('elastic_logs').url,
        headers,
        params
      ),
    dataFlow: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<DataFlowGraph>(
        basePath.slash(pk).slash('data-flow').url,
        headers,
        params
      ),
    events: async (
      pk: string,
      params: Partial<{ page_size: number; page: number }>
    ) =>
      await get<{ results: ComponentEvent[]; next: string | null }>(
        basePath.slash(pk).slash('events').url,
        headers,
        ...[params]
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

  const bulkUpdate = (
    id: string,
    data: Partial<ComponentObject>[]
  ): Promise<ComponentObject[]> => patch(basePath.slash(id).url, data, headers);

  const update = (
    id: string,
    data: Partial<ComponentObject>
  ): Promise<ComponentObject> => patch(basePath.slash(id).url, data, headers);

  return {
    ...baseClient,
    bulkUpdate,
    update,
  };
};

export const ComponentRoutinesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/component/routines/');
  const baseClient = BaseRestClient<RoutineObjectParams, RoutineObject>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    evaluations: async (pk: string) =>
      await get<RoutineEvaluation[]>(
        basePath.slash(pk).slash('evaluations').url,
        headers
      ),
  };
};
