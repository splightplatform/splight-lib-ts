import { BaseRestClient } from "../rest/BaseRestClient.js";
import { Headers } from "../types.js";
import { Path } from "../Urls.js";

export interface Credential {
  access_id: string;
  created_date: string;
  last_used: string;
  secret_key?: string;
}

export interface CredentialParams {}

export const ApiKeysClient = (headers: Headers) => {
  const basePath = Path("account/credentials/");
  const { list, create } = BaseRestClient<CredentialParams, Credential>(
    basePath,
    headers
  );
  return {
    list,
    create,
  };
};