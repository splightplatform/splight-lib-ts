import { getResourceRoute, getResourceUrl } from "./resource-routes.js";
import { get } from "./rest/base-methods.js";
import { useBaseRestClient } from "./rest/useBaseRestClient.js";
import {
  Asset,
  Attribute,
  Component,
  Edge,
  Headers,
  PaginatedCollection,
} from "./types.js";

export const useAssetClient = (headers: Headers) => {
  const base_url = getResourceUrl("Asset");
  return {
    ...useBaseRestClient<Asset>(base_url, headers),
    attributes: (asset_id: string) =>
      get<PaginatedCollection<Attribute>>(
        `${base_url}${asset_id}/attributes`,
        headers
      ),
  };
};

export const useAttributeClient = (headers: Headers) => {
  const base_url = getResourceUrl("Attribute");
  return {
    ...useBaseRestClient<Attribute>(base_url, headers),
  };
};

export const useFileClient = (headers: Headers) => {
  const base_url = getResourceUrl("File");
  return {
    ...useBaseRestClient<Attribute>(base_url, headers),
  };
};

export const useComponentClient = (headers: Headers) => {
  const base_url = getResourceUrl("Component");
  return {
    ...useBaseRestClient<Component>(base_url, headers),
  };
};

//Graphs

export const useGraphClient = (headers: Headers) => {
  const base_url = getResourceUrl("Graph");
  return {
    ...useBaseRestClient<Attribute>(base_url, headers),
  };
};

export const useEdgeClient = (headers: Headers) => {
  const base_url = getResourceUrl("Edge");
  return {
    ...useBaseRestClient<Edge>(base_url, headers),
  };
};

export const useNodeClient = (headers: Headers) => {
  const base_url = getResourceUrl("Node");
  return {
    ...useBaseRestClient<Attribute>(base_url, headers),
  };
};
