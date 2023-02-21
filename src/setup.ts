import {
  Asset,
  getHeaders,
  SplightCredentials,
  BaseRestClient,
} from "./rest/index.js";
import { getResourcePath } from "./urls.js";
import { ComponentsClient } from "./engine/component.js";
import { Headers } from "./types.js";

import { AssetsClient } from "./engine/asset.js";
import { AttributesClient } from "./engine/attribute.js";

export const configure = (requestHeaders?: Headers) => {
  const credentials: SplightCredentials = {
    splight_access_id: process.env.SPLIGHT_ACCESS_ID ?? "",
    splight_access_key: process.env.SPLIGHT_ACCESS_KEY ?? "",
  };
  const headers = requestHeaders ?? getHeaders(credentials);
  const engine = {
    assets: AssetsClient(headers),
    attributes: AttributesClient(headers),
    components: ComponentsClient(headers),
  };

  return {
    engine,
  };
};

export default {
  configure,
};
