// Components

import { get, post } from "../../rest/BaseMethods.js";
import { BaseRestClient } from "../../rest/BaseRestClient.js";
import { Headers } from "../../types.js";
import { Path } from "../../Urls.js";

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
  log_level?: LogLevel;
  type?: string;
  component_capacity: ComponentSize;
  restart_policy?: RestartPolicy;
  version: string;
  custom_types?: CustomType[];
  input?: ComponentParameter[];
  output: ComponentParameter[];
  commands?: ComponentCommand[];
  bindings?: Binding[];
  endpoints?: Endpoint[];
  active?: boolean;
}

export type RestartPolicy = "Always" | "OnFailure" | "Never";

export type LogLevel = "DEBUG" | "INFO" | "WARNING" | "ERROR" | "CRITICAL";

export const ComponentsClient = (headers: Headers) => {
  const basePath = Path("engine/component/components/");
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
      component_capacity: component.min_component_capacity,
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
    console.log(new_component);
    return post<ComponentParams, Component>(
      basePath.url,
      new_component,
      headers
    );
  };

  return {
    ...baseClient,
    fromHubComponent,
    start: (pk: string, data: ComponentParams) =>
      post(basePath.slash(pk).slash("start").url, data, headers),
    stop: (pk: string, data: ComponentParams) =>
      post(basePath.slash(pk).slash("stop").url, data, headers),
    objects: (pk: string) =>
      get<ComponentObject[]>(basePath.slash(pk).slash("objects").url, headers),
    commands: (pk: string) =>
      get<ComponentCommand[]>(
        basePath.slash(pk).slash("commands").url,
        headers
      ),
  };
};
