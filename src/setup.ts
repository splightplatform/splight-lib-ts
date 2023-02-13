import {
  Asset,
  getHeaders,
  SplightCredentials,
  useBaseRestClient,
} from "./rest/index.js";
import { getResourceRoute } from "./resource-routes.js";
import { Component } from "./types.js";
import {
  useAssetClient,
  useAttributeClient,
  useComponentClient,
  useComponentCommandClient,
  useComponentObjectClient,
  useEdgeClient,
  useGraphClient,
  useNodeClient,
  useNotificationClient,
  useQueryClient,
  useSecretClient,
} from "./resource-clients.js";

export const configure = () => {
  const credentials: SplightCredentials = {
    splight_access_id: process.env.SPLIGHT_ACCESS_ID ?? "",
    splight_access_key: process.env.SPLIGHT_ACCESS_KEY ?? "",
  };
  const headers = getHeaders(credentials);

  return {
    assets: useAssetClient(headers),
    attributes: useAttributeClient(headers),
    components: useComponentClient(headers),
    queries: useQueryClient(headers),
    secrets: useSecretClient(headers),
    notifications: useNotificationClient(headers),
    component_objects: useComponentObjectClient(headers),
    component_commands: useComponentCommandClient(headers),
    /*
    Typescript allows for implementing 'nested clients' like this:

        components: {
      ...useComponentClient(headers),
      commands: useComponentCommandClient(headers),
      objects: useComponentObjectClient(headers),
    },

    I think that this could be nice, but it may be hard to reproduce in Python.
    */
    graphs: useGraphClient(headers),
    edges: useEdgeClient(headers),
    nodes: useNodeClient(headers),
  };
};

export default {
  configure,
};
