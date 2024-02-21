import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Asset, AssetKind } from '../assets/Assets.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface AssetRelationshipParams {
  name: string;
  description?: string;
  asset?: Asset;
  related_asset?: Asset | null;
  related_asset_kind?: AssetKind | null;
}

export interface AssetRelationship extends AssetRelationshipParams {
  id?: string;
}

export const AssetRelationshipClient = (headers: Headers) => {
  const basePath = Path('v2/engine/asset/relationships');
  const baseClient = BaseRestClient<AssetRelationshipParams, AssetRelationship>(
    basePath,
    headers
  );
  return {
    ...baseClient,
  };
};
