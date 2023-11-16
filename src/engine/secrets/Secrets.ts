import { post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface SecretParams {
  name: string;
  value: string;
}

export interface Secret extends SecretParams {
  id: string;
}

export interface DecryptSecretParams {
  name: string;
}

export const SecretsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/secret/secrets/');
  const baseClient = BaseRestClient<SecretParams, Secret>(basePath, headers);
  return {
    ...baseClient,
    decrypt: (name: string) =>
      post<DecryptSecretParams, Secret>(
        basePath.slash('decrypt').url,
        { name: name },
        headers
      ),
  };
};
