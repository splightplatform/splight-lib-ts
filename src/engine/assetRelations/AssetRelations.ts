import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Asset, AssetKind } from '../assets/Assets.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface AssetRelationParam {
  name: string;
  description?: string;
  asset?: Asset;
  related_asset?: Asset | null;
  related_asset_kind?: AssetKind | null;
}

export interface AssetRelation extends AssetRelationParam {
  id?: string;
}

export const AssetRelationsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/asset/relations');
  const baseClient = BaseRestClient<AssetRelationParam, AssetRelation>(
    basePath,
    headers
  );
  return {
    ...baseClient,
  };
};
