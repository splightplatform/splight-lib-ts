import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Asset, AssetKind } from '../assets/Assets.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface AssetFlowParam {
  name: string;
  description?: string;
  asset?: Asset;
  related_asset?: Asset | null;
  related_asset_kind?: AssetKind | null;
}

export interface AssetFlow extends AssetFlowParam {
  id?: string;
}

export const AssetFlowClient = (headers: Headers) => {
  const basePath = Path('v2/engine/asset/relations');
  const baseClient = BaseRestClient<AssetFlowParam, AssetFlow>(
    basePath,
    headers
  );
  return {
    ...baseClient,
  };
};
