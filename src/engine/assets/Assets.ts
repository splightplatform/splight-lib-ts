import { FeatureCollection, Geometry, GeometryCollection } from 'geojson';
import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, BasePaginatedCollection } from '../../types.js';
import { Path } from '../../Urls.js';
import { Attribute, RelationshipGraph } from '../attributes/Attributes.js';
import { Metadata } from '../metadata/Metadata.js';
import { _File } from '../files/Files.js';

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
  kind?: AssetKind;
  attributes?: Attribute[];
  metadata?: Metadata[];
  organization?: string;
  verified?: boolean;
  geometry?: GeometryCollection;
  pinned_at?: string | null;
  related_assets?: { id: string; name: string }[];
}

export type Asset = AssetParams &
  BaseRelatedAssetObj & {
    id: string;
    attributes: Attribute[];
    metadata?: Metadata[];
    files?: _File[];
    verified: boolean;
    description: string;
    organization: string;
    centroid_coordinates?: [number, number];
    centroid?: Geometry;
    geometry: GeometryCollection;
    status: string;
  };

export interface SetpointParams {
  value: string;
  attribute: string;
}

export interface SetAttributeCsvParams {
  file: File;
  attributeid: string;
}

export interface Setpoint {
  id: string;
  value: string;
  asset: Asset;
  attribute: Attribute;
  created_at: string;
}

export interface SetpointResponse {
  id: string;
  setpoint: string;
  component: string;
  status: string;
  created_at: string;
}

export interface GetAttributeParams {
  attribute: string;
}
export interface GetAttribute {
  attribute: Attribute;
  value: string;
  timestamp: string;
  created_at: string;
}

export const AssetsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/asset/assets/');
  const baseClient = BaseRestClient<AssetParams, Asset>(basePath, headers);
  return {
    ...baseClient,
    setAttribute: async (assetId: string, setpoint: SetpointParams) =>
      post<SetpointParams, Setpoint>(
        basePath.slash(assetId).slash('set-attribute').url,
        setpoint,
        headers
      ),
    setAttributeCsv: async (
      assetId: string,
      setAttributeCsv: SetAttributeCsvParams
    ) =>
      post<{ setAttributeCsv: SetAttributeCsvParams }, void>(
        basePath.slash(assetId).slash('set-attribute-csv').url,
        { setAttributeCsv },
        headers
      ),
    getAttribute: async (assetId: string, attributeId: string) =>
      post<GetAttributeParams, GetAttribute>(
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
    relationships: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<RelationshipGraph>(
        basePath.slash(pk).slash('relationships').url,
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
