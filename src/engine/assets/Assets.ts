import { BaseRestClient } from "../../rest/BaseRestClient.js";
import { Headers, PaginatedCollection } from "../../types.js";
import { Path } from "../../Urls.js";
import { get } from "../../rest/BaseMethods.js";
import { Attribute } from "../attributes/Attributes.js";
import { FeatureCollection, GeometryCollection } from "geojson";

export interface AssetParams {
  name: string;
  description?: string;
  attributes?: Attribute[];
  geometry?: GeometryCollection;
}

export type Asset = AssetParams & {
  id: string;
  attributes: Attribute[];
  verified: boolean;
  description: string;
  organization: string;
  geometry: GeometryCollection;
};

export const AssetsClient = (headers: Headers) => {
  const basePath = Path("engine/assets/");
  const baseClient = BaseRestClient<AssetParams, Asset>(basePath, headers);
  return {
    ...baseClient,
    geojson: async (params: { name__icontains: string }) =>
      await get<FeatureCollection<GeometryCollection, Asset>>(
        basePath.slash("geojson").url,
        headers
      ),
    attributes: (pk: string) =>
      get<PaginatedCollection<Attribute>>(
        basePath.slash(pk).slash("attributes").url,
        headers
      ),
  };
};
