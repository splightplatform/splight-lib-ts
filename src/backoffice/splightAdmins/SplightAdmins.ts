import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { ApiFormField, Headers, Subscription } from '../../types.js';
import { Path } from '../../Urls.js';

export interface SplightAdminsParams {
  username:string;
  is_splight_admin:boolean;
}

export interface SplightAdmins extends SplightAdminsParams {
  id: string;
}


export const SplightAdminsClient = (headers: Headers) => {
  const basePath = Path('v2/backoffice/splightadmins/');
  const baseClient = BaseRestClient<SplightAdminsParams, SplightAdmins>(
    basePath,
    headers
  );
  return baseClient;
};
