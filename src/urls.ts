export const resource_urls = {
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

export const API_HOST = process.env.API_HOST ?? "http://api.splight-ai.com/v2";

export const getResourceUrl = (resource_name: keyof typeof resource_urls) =>
  `${API_HOST}/${getResourceRoute(resource_name)}`;

export const getResourceRoute = (resource_name: keyof typeof resource_urls) =>
  resource_urls[resource_name];

export const useRouter = (resource_name: keyof typeof resource_urls) => {
  const base_url = getResourceUrl(resource_name);
  return {
    base: {
      url: base_url,
    },
    detail: (id: string) => ({
      url: `${base_url}${id}/`,
      action: (action: string) => ({
        url: `${base_url}${id}/${action}/`,
      }),
    }),
    action: (action: string) => ({
      url: `${base_url}${action}/`,
    }),
  };
};

export type Router = ReturnType<typeof useRouter>;
