import {
  BaseComponentResource,
  Binding,
  ComponentObject,
  ComponentParameter,
  ComponentSize,
  CustomType,
  Endpoint,
  HubComponent,
} from '../../hub/components/Components.js';
import { get, patch, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import {
  ComputeNode,
  DataFlowGraph,
  Headers,
  LogEntry,
  Optional,
  PaginatedCollection,
  Tag,
} from '../../types.js';
import { Path } from '../../Urls.js';

export interface RoutineObject extends BaseComponentResource {
  status?: string;
  config: ComponentParameter[];
  input: ComponentParameter[];
  output: ComponentParameter[];
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

const BaseComponentsClient = (basePath: Path, headers: Headers) => {
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

export const AlgorithmsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/component/algorithms/');
  return BaseComponentsClient(basePath, headers);
};

export const ConnectorsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/component/connectors/');
  return BaseComponentsClient(basePath, headers);
};

export const ComponentsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/component/components/');
  return BaseComponentsClient(basePath, headers);
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
    evaluations: async (
      pk: string,
      params?: {
        page_size?: number;
        since?: string;
        until?: string;
      }
    ) =>
      await get<PaginatedCollection<RoutineEvaluation>>(
        basePath.slash(pk).slash('evaluations').url,
        headers,
        params
      ),
  };
};
