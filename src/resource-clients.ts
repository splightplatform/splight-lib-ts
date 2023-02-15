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
  Graph,
  Headers,
  Notification,
  PaginatedCollection,
  Query,
  Secret,
} from "./types.js";

export const useAssetClient = (headers: Headers) => {
  const router = useRouter("Asset");
  const { list, retrieve, create, update, destroy } = useBaseRestClient<Asset>(
    router,
    headers
  );
  return {
    list,
    retrieve,
    create,
    update,
    destroy,
    attributes: (pk: string) =>
      get<PaginatedCollection<Attribute>>(
        router.detail(pk).action("attributes").url,
        headers
      ),
  };
};

export const useAttributeClient = (headers: Headers) => {
  const router = useRouter("Attribute");
  const { list, retrieve, create, update, destroy } =
    useBaseRestClient<Attribute>(router, headers);
  return {
    list,
    retrieve,
    create,
    update,
    destroy,
  };
};

export const useFileClient = (headers: Headers) => {
  const router = useRouter("File");
  const { list, retrieve, create, update, destroy } = useBaseRestClient<File>(
    router,
    headers
  );
  return {
    list,
    retrieve,
    create,
    update,
    destroy,
  };
};

export const useSecretClient = (headers: Headers) => {
  const router = useRouter("Secret");
  const { list, retrieve, create, update, destroy } = useBaseRestClient<Secret>(
    router,
    headers
  );
  return {
    list,
    retrieve,
    create,
    update,
    destroy,
  };
};

export const useNotificationClient = (headers: Headers) => {
  const router = useRouter("Notification");
  const { list, retrieve, create, update, destroy } =
    useBaseRestClient<Notification>(router, headers);
  return {
    list,
    retrieve,
    create,
    update,
    destroy,
  };
};

export const useQueryClient = (headers: Headers) => {
  const router = useRouter("Query");
  const { list, retrieve, create, update, destroy } = useBaseRestClient<Query>(
    router,
    headers
  );
  return {
    list,
    retrieve,
    create,
    update,
    destroy,

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
  const { list, retrieve, create, update, destroy } =
    useBaseRestClient<Component>(router, headers);
  return {
    list,
    retrieve,
    create,
    update,
    destroy,
  };
};

export const useComponentObjectClient = (headers: Headers) => {
  const router = useRouter("ComponentObject");
  const { list, retrieve, create, update, destroy } =
    useBaseRestClient<ComponentObject>(router, headers);
  return {
    list,
    retrieve,
    create,
    update,
    destroy,
  };
};

export const useComponentCommandClient = (headers: Headers) => {
  const router = useRouter("ComponentCommand");
  const { list, retrieve, create, update, destroy } =
    useBaseRestClient<ComponentCommand>(router, headers);
  return {
    list,
    retrieve,
    create,
    update,
    destroy,
  };
};

// TODO: Do HubComponents need their own type?
export const useHubComponentClient = (headers: Headers) => {
  const router = useRouter("HubComponent");
  const { list, retrieve, create, update, destroy } =
    useBaseRestClient<Component>(router, headers);
  return {
    list,
    retrieve,
    create,
    update,
    destroy,
  };
};

//Graphs

export const useGraphClient = (headers: Headers) => {
  const router = useRouter("Graph");
  const { list, retrieve, create, update, destroy } = useBaseRestClient<Graph>(
    router,
    headers
  );
  return {
    list,
    retrieve,
    create,
    update,
    destroy,
  };
};

export const useEdgeClient = (headers: Headers) => {
  const router = useRouter("Edge");
  const { list, retrieve, create, update, destroy } = useBaseRestClient<Edge>(
    router,
    headers
  );
  return {
    list,
    retrieve,
    create,
    update,
    destroy,
  };
};

export const useNodeClient = (headers: Headers) => {
  const router = useRouter("Node");
  const { list, retrieve, create, update, destroy } = useBaseRestClient<Node>(
    router,
    headers
  );
  return {
    list,
    retrieve,
    create,
    update,
    destroy,
  };
};
