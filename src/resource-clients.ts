import { getResourceRoute, getResourceUrl } from "./resource-routes.js";
import { get } from "./rest/base-methods.js";
import { useBaseRestClient } from "./rest/useBaseRestClient.js";
import {
  ApiQuery,
  Asset,
  Attribute,
  Component,
  ComponentCommand,
  ComponentObject,
  Edge,
  Headers,
  Notification,
  PaginatedCollection,
  Query,
  Secret,
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

export const useSecretClient = (headers: Headers) => {
  const base_url = getResourceUrl("Secret");
  return {
    ...useBaseRestClient<Secret>(base_url, headers),
  };
};

export const useNotificationClient = (headers: Headers) => {
  const base_url = getResourceUrl("Notification");
  return {
    ...useBaseRestClient<Notification>(base_url, headers),
  };
};

export const useQueryClient = (headers: Headers) => {
  const base_url = getResourceUrl("Query");
  return {
    ...useBaseRestClient<Query>(base_url, headers),
    // This method it's going to be the main way to interact with the datalake.
    // It takes the query id or a query object and returns a promise with the data
    execute: (
      query: string | ApiQuery
    ): Promise<unknown /*TODO: Define what this type should be, it's porbably going to be something like NativeValue | ComponentOutput*/> => {
      throw Error("Not implemented");
    },
  };
};

// Components

export const useComponentClient = (headers: Headers) => {
  const base_url = getResourceUrl("Component");
  return {
    ...useBaseRestClient<Component>(base_url, headers),
  };
};

export const useComponentObjectClient = (headers: Headers) => {
  const base_url = getResourceUrl("ComponentObject");
  return {
    ...useBaseRestClient<ComponentObject>(base_url, headers),
  };
};

export const useComponentCommandClient = (headers: Headers) => {
  const base_url = getResourceUrl("ComponentCommand");
  return {
    ...useBaseRestClient<ComponentCommand>(base_url, headers),
  };
};

// TODO: Do HubComponents need their own type?
export const useHubComponentClient = (headers: Headers) => {
  const base_url = getResourceUrl("HubComponent");
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
