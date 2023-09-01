import { FeatureCollection, GeometryCollection } from 'geojson';
import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, PaginatedCollection } from '../../types.js';
import { Path } from '../../Urls.js';
import { Attribute, AttributeRelationships } from '../attributes/Attributes.js';

export interface AssetParams {
  name: string;
  description?: string;
  attributes?: Attribute[];
  organization?: string;
  verified?: boolean;
  geometry?: GeometryCollection;
}

export type Asset = AssetParams & {
  id: string;
  attributes: Attribute[];
  verified: boolean;
  description: string;
  organization: string;
  centroid_coordinates?: [number, number];
  geometry: GeometryCollection;
};

export interface SetpointParams {
  value: string;
  attribute: string;
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
  const basePath = Path('v2/engine/assets/');
  const baseClient = BaseRestClient<
    AssetParams,
    Asset,
    Partial<{ unpaginated: boolean; page_size: number; page: number }>
  >(basePath, headers);
  return {
    ...baseClient,
    setAttribute: async (assetId: string, setpoint: SetpointParams) =>
      post<SetpointParams, Setpoint>(
        basePath.slash(assetId).slash('set-attribute').url,
        setpoint,
        headers
      ),
    getAttribute: async (assetId: string, attributeId: string) =>
      post<GetAttributeParams, GetAttribute>(
        basePath.slash(assetId).slash('get-attribute').url,
        { attribute: attributeId },
        headers
      ),
    geojson: async (params?: { name__icontains?: string }) =>
      await get<FeatureCollection<GeometryCollection, Asset>>(
        basePath.slash('geojson').url,
        headers,
        params
      ),
    attributes: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<PaginatedCollection<Attribute>>(
        basePath.slash(pk).slash('attributes').url,
        headers,
        params
      ),
    relationships: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<Array<AttributeRelationships>>(
        basePath.slash(pk).slash('relationship').url,
        headers,
        params
      ),
  };
};
