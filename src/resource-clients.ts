import { getResourceRoute } from "./resource-routes.js";
import { get } from "./rest/base-methods.js";
import { useBaseRestClient } from "./rest/useBaseRestClient.js";
import { Asset, Attribute, Component, PaginatedCollection } from "./types.js";

//This will be stored in an env variable
const base_url = "http://integrationapi.splight-ai.com/v2";

export const useAssetClient = (headers: Record<string, string>) => {
  const route = getResourceRoute("Asset");
  const url = `${base_url}/${route}`;
  return {
    ...useBaseRestClient<Asset>(url, headers),
    attributes: (asset_id: string) =>
      get<PaginatedCollection<Attribute>>(
        `${url}${asset_id}/attributes`,
        headers
      ),
  };
};

export const useComponentClient = (headers: Record<string, string>) => {
  const route = getResourceRoute("Component");
  const url = `${base_url}/${route}`;
  return {
    ...useBaseRestClient<Component>(url, headers),
  };
};
