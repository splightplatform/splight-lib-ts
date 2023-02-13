export const resource_urls = {
  Asset: "engine/assets/",
  Component: "engine/component/components",
  Attribute: "engine/attributes/",
  File: "engine/files/",
  Query: "engine/queries/",
  Dashboard: "engine/dashboard/dashboards",
};

export const API_URL = "http://integrationapi.splight-ai.com/v2";

export const getResourceUrl = (resource_name: keyof typeof resource_urls) =>
  `${API_URL}/${resource_urls[resource_name]}`;

export const getResourceRoute = (resource_name: keyof typeof resource_urls) =>
  resource_urls[resource_name];
