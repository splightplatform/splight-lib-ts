export const resource_urls = {
  Asset: "engine/assets/",
  Component: "engine/component/components",
  Attribute: "engine/attributes/",
  Query: "engine/queries/",
  Dashboard: "engine/dashboard/dashboards",
};

export const getResourceRoute = (resource_name: keyof typeof resource_urls) =>
  resource_urls[resource_name];
