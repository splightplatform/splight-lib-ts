import { FeatureCollection, Geometry, GeometryCollection } from 'geojson';
import { Path } from '../../Urls.js';
import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { BasePaginatedCollection, Headers, Tag } from '../../types.js';
import { AssetAction } from '../actions/Actions.js';
import { AssetRelation } from '../assetRelations/AssetRelations.js';
import { Attribute } from '../attributes/Attributes.js';
import { DataFlowGraph } from '../dataFlow/DataFlow.js';
import { _File } from '../files/Files.js';
import { Metadata } from '../metadata/Metadata.js';

export interface BaseRelatedAssetObj {
  id: string;
  assets?: Asset[];
}

export interface AssetKind {
  id: string;
  name: string;
}

export type AssetKindParams = Omit<AssetKind, 'id'>;

export interface AssetParams {
  name: string;
  description?: string;
  kind?: AssetKind | null;
  attributes?: Attribute[];
  actions?: AssetAction[];
  metadata?: Metadata[];
  related_to?: AssetRelation[];
  related_from?: AssetRelation[];
  organization?: string;
  verified?: boolean;
  geometry?: GeometryCollection;
  pinned_at?: string | null;
  related_assets?: { id: string; name: string }[];
  tags?: Tag[];
}

export type Asset = AssetParams &
  BaseRelatedAssetObj & {
    id: string;
    attributes: Attribute[];
    metadata?: Metadata[];
    actions?: AssetAction[];
    files?: _File[];
    verified: boolean;
    description: string;
    organization: string;
    centroid_coordinates?: [number, number];
    centroid?: Geometry;
    geometry: GeometryCollection;
    status: string;
    timezone?: string;
  };

export interface AssetSetAttributeParams {
  value: string;
  attribute: string;
}

export interface AssetSetAttributeCsvParams {
  file: File;
  attributeid: string;
}

export interface AssetGetAttributeParams {
  attribute: string;
}
export interface AssetGetAttribute {
  attribute: Attribute;
  value: string;
  timestamp: string;
}

export const AssetsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/asset/assets/');
  const baseClient = BaseRestClient<AssetParams, Asset>(basePath, headers);
  return {
    ...baseClient,
    setAttribute: async (assetId: string, setpoint: AssetSetAttributeParams) =>
      post<AssetSetAttributeParams, void>(
        basePath.slash(assetId).slash('set-attribute').url,
        setpoint,
        headers
      ),
    setAttributeCsv: async (
      assetId: string,
      setAttributeCsv: AssetSetAttributeCsvParams
    ) =>
      post<{ setAttributeCsv: AssetSetAttributeCsvParams }, void>(
        basePath.slash(assetId).slash('set-attribute-csv').url,
        { setAttributeCsv },
        headers
      ),
    getAttribute: async (assetId: string, attributeId: string) =>
      post<AssetGetAttributeParams, AssetGetAttribute>(
        basePath.slash(assetId).slash('get-attribute').url,
        { attribute: attributeId },
        headers
      ),
    attributes: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<BasePaginatedCollection<Attribute>>(
        basePath.slash(pk).slash('attributes').url,
        headers,
        params
      ),
    metadata: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<BasePaginatedCollection<Metadata>>(
        basePath.slash(pk).slash('metadata').url,
        headers,
        params
      ),
    dataFlow: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<DataFlowGraph>(
        basePath.slash(pk).slash('data-flow').url,
        headers,
        params
      ),
    geojson: async (params?: { name__icontains?: string }) =>
      await get<FeatureCollection<GeometryCollection, Asset>>(
        Path('v2/engine/asset/geojson/').url,
        headers,
        params
      ),
  };
};

export const AssetKindsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/asset/kinds/');
  const baseClient = BaseRestClient<AssetKindParams, AssetKind>(
    basePath,
    headers
  );
  return {
    ...baseClient,
  };
};
