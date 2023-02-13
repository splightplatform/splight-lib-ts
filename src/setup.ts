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
    edges: useEdgeClient(headers),
  };
};

export default {
  configure,
};
