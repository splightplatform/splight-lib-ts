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
import { Backoffice } from "./Backoffice.js";

const Splight = (requestHeaders?: Headers, api_host?: string) => {
  const headers = requestHeaders ?? getHeaders();

  return {
    engine: Engine(headers),
    account: Account(headers),
    hub: Hub(headers),
    backoffice: Backoffice(headers),
  };
};

export default Splight;
