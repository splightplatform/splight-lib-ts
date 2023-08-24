import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Asset, AssetParams, Headers } from '../types.js';
import { Path } from '../Urls.js';

export const AssetsClient = (headers: Headers) => {
  const basePath = Path('v2/account/contracts/');
  const { list } = BaseRestClient<Asset, AssetParams>(basePath, headers);
  return {
    list,
  };
};
