export const resource_urls = {
  Asset: "engine/assets/",
  Component: "engine/component/components",
  ComponentObject: "engine/component/objects",
  ComponentCommand: "engine/component/commands",
  HubComponent: "engine/hub/component-versions",
  Attribute: "engine/attributes/",
  File: "engine/files/",
  Query: "engine/queries/",
  Dashboard: "engine/dashboard/dashboards",
  Graph: "engine/graph/graphs",
  Edge: "engine/graph/edges",
  Node: "engine/graph/nodes",
};

export const API_HOST = process.env.API_HOST ?? "http://api.splight-ai.com/v2";

export const getResourceUrl = (resource_name: keyof typeof resource_urls) =>
  `${API_HOST}/${getResourceRoute(resource_name)}`;

export const getResourceRoute = (resource_name: keyof typeof resource_urls) =>
  resource_urls[resource_name];
