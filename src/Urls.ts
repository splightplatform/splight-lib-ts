export const resource_paths = {
  Asset: "engine/assets/",
  Attribute: "engine/attributes/",
  Component: "engine/component/components/",
  ComponentObject: "engine/component/objects/",
  ComponentCommand: "engine/component/commands/",
  HubComponent: "engine/hub/component-versions/",
  File: "engine/files/",
  Notification: "account/notifications/",
  Secret: "engine/secrets/",
  Query: "engine/queries/",
  Dashboard: "engine/dashboard/dashboards/",
  Graph: "engine/graph/graphs/",
  Edge: "engine/graph/edges/",
  Node: "engine/graph/nodes/", // What about bulk creation of nodes?
};

export const API_HOST = process.env.API_BASE_URL ?? "http://127.0.0.1:8000/"; //"https://integrationapi.splight-ai.com/v2/"

export const getResourceUrl = (resource_name: keyof typeof resource_paths) =>
  new URL(getResourcePath(resource_name), API_HOST);

export const getResourcePath = (resource_name: keyof typeof resource_paths) =>
  resource_paths[resource_name];

export const Path = (base_path: string) => {
  const base_url = new URL(base_path, API_HOST).href;
  return {
    url: base_url,
    slash: (next_segment: string, trailing_slash: boolean = true) =>
      Path(
        `${base_url}${base_url.endsWith("/") ? "" : "/"}${next_segment}${
          trailing_slash ? "/" : ""
        }`
      ),
  };
};

export type Path = ReturnType<typeof Path>;

const path = Path("engine/assets/");
