import { useRouter, getResourceUrl } from "./urls.js";
import { get } from "./rest/base-methods.js";
import { useBaseRestClient } from "./rest/useBaseRestClient.js";
import {
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
  const router = useRouter("Asset");
  return {
    ...useBaseRestClient<Asset>(router, headers),
    attributes: (pk: string) =>
      get<PaginatedCollection<Attribute>>(
        router.detail(pk).action("attributes").url,
        headers
      ),
  };
};

export const useAttributeClient = (headers: Headers) => {
  const router = useRouter("Attribute");
  return {
    ...useBaseRestClient<Attribute>(router, headers),
  };
};

export const useFileClient = (headers: Headers) => {
  const router = useRouter("File");
  return {
    ...useBaseRestClient<Attribute>(router, headers),
  };
};

export const useSecretClient = (headers: Headers) => {
  const router = useRouter("Secret");
  return {
    ...useBaseRestClient<Secret>(router, headers),
  };
};

export const useNotificationClient = (headers: Headers) => {
  const router = useRouter("Notification");
  return {
    ...useBaseRestClient<Notification>(router, headers),
  };
};

export const useQueryClient = (headers: Headers) => {
  const router = useRouter("Query");
  return {
    ...useBaseRestClient<Query>(router, headers),
    // This method it's going to be the main way to interact with the datalake.
    // It takes the query id or a query object and returns a promise with the data
    execute: (
      query: string | Query
    ): Promise<unknown /*TODO: Define what this type should be, it's porbably going to be something like NativeValue | ComponentOutput*/> => {
      throw Error("Not implemented");
    },
  };
};

// Components

export const useComponentClient = (headers: Headers) => {
  const router = useRouter("Component");
  return {
    ...useBaseRestClient<Component>(router, headers),
  };
};

export const useComponentObjectClient = (headers: Headers) => {
  const router = useRouter("ComponentObject");
  return {
    ...useBaseRestClient<ComponentObject>(router, headers),
  };
};

export const useComponentCommandClient = (headers: Headers) => {
  const router = useRouter("ComponentCommand");
  return {
    ...useBaseRestClient<ComponentCommand>(router, headers),
  };
};

// TODO: Do HubComponents need their own type?
export const useHubComponentClient = (headers: Headers) => {
  const router = useRouter("HubComponent");
  return {
    ...useBaseRestClient<Component>(router, headers),
  };
};

//Graphs

export const useGraphClient = (headers: Headers) => {
  const router = useRouter("Graph");
  return {
    ...useBaseRestClient<Attribute>(router, headers),
  };
};

export const useEdgeClient = (headers: Headers) => {
  const router = useRouter("Edge");
  return {
    ...useBaseRestClient<Edge>(router, headers),
  };
};

export const useNodeClient = (headers: Headers) => {
  const router = useRouter("Node");
  return {
    ...useBaseRestClient<Attribute>(router, headers),
  };
};
