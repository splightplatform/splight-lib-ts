import { BaseRestClient } from "../../rest/BaseRestClient.js";
import { Headers, PaginatedCollection } from "../../types.js";
import { Path } from "../../Urls.js";
import { get } from "../../rest/BaseMethods.js";
import { Attribute } from "../attributes/Attributes.js";
import { Feature, GeoJsonProperties, LineString, Point } from 'geojson';

export type AssetGeoJsonFeature = Feature<
  Point | LineString,
  GeoJsonProperties & {
    id: string;
    name: string;
    description: string;
    verified: boolean;
    isCenterPoint: boolean;
  }
>;

export interface AssetParams {
  name: string;
  description?: string;
  attributes?: Attribute[];
  geo_data?: AssetGeoJsonFeature[];
}

export type Asset = AssetParams & {
  id: string;
  attributes: Attribute[];
  verified: boolean;
  description: string;
  organization: string;
};

export const AssetsClient = (headers: Headers) => {
  const basePath = Path("engine/assets/");
  const baseClient = BaseRestClient<AssetParams, Asset>(basePath, headers);
  return {
    ...baseClient,
    geojson: async () =>
      (
        await get<{ features: AssetGeoJsonFeature[] }>(
          basePath.slash("geojson").url,
          headers
        )
      ).features,
    attributes: (pk: string) =>
      get<PaginatedCollection<Attribute>>(
        basePath.slash(pk).slash("attributes").url,
        headers
      ),
  };
};
