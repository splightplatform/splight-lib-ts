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
  useEdgeClient,
  useGraphClient,
  useNodeClient,
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
    //Should we group these together in a graphs module?
    graphs: useGraphClient(headers),
    edges: useEdgeClient(headers),
    nodes: useNodeClient(headers),
  };
};

export default {
  configure,
};
