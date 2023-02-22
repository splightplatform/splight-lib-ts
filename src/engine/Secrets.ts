import { BaseRestClient } from "../rest/BaseRestClient.js";
import { Headers } from "../types.js";
import { Path } from "../Urls.js";

export interface SecretParams {
  name: string;
  value: string;
}

export interface Secret extends SecretParams {
  id: string;
}

export const SecretsClient = (headers: Headers) => {
  const basePath = Path("engine/secrets/");
  const baseClient = BaseRestClient<SecretParams, Secret>(basePath, headers);
  return baseClient;
};
