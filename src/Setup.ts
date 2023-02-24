import {
  Asset,
  getHeaders,
  SplightCredentials,
  BaseRestClient,
} from "./rest/index.js";
import { Headers } from "./types.js";
import { Engine } from "./Engine.js";
import { Account } from "./Account.js";
import { API_HOST } from "./Urls.js";
import { Hub } from "./Hub.js";
const credentials: SplightCredentials = {
  splight_access_id: process.env.SPLIGHT_ACCESS_ID ?? "",
  splight_access_key: process.env.SPLIGHT_ACCESS_KEY ?? "",
};

export const configure = (requestHeaders?: Headers, api_host?: string) => {
  const headers = requestHeaders ?? getHeaders(credentials);

  return {
    engine: Engine(headers),
    account: Account(headers),
    hub: Hub(headers),
  };
};

export default {
  configure,
};
