import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Agreement, AgreementParams, Headers } from '../types.js';
import { Path } from '../Urls.js';

export const AgreementsClient = (headers: Headers) => {
  const basePath = Path('v2/landing/agreements/');
  const { list } = BaseRestClient<AgreementParams, Agreement>(
    basePath,
    headers
  );
  return {
    list,
  };
};
