export const resource_urls = {
  Asset: "engine/assets/",
  Component: "engine/component/components",
  Attribute: "engine/attributes/",
  File: "engine/files/",
  Query: "engine/queries/",
  Dashboard: "engine/dashboard/dashboards",
  Edge: "engine/graph/edges",
};

export const API_HOST = process.env.API_HOST ?? "http://api.splight-ai.com/v2";

export const getResourceUrl = (resource_name: keyof typeof resource_urls) =>
  `${API_HOST}/${resource_urls[resource_name]}`;

export const getResourceRoute = (resource_name: keyof typeof resource_urls) =>
  resource_urls[resource_name];
