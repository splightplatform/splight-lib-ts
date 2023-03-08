import { BaseRestClient } from "../../rest/BaseRestClient.js";
import { Headers, PaginatedCollection } from "../../types.js";
import { Path } from "../../Urls.js";
import { get } from "../../rest/BaseMethods.js";
import { Attribute } from "../attributes/Attributes.js";

export interface AssetParams {
  name: string;
  description?: string;
  attributes?: Attribute[];
  latitude?: number;
  longitude?: number;
}

export type Asset = AssetParams & {
  id: string;
  attributes: Attribute[];
  verified: boolean;
  description: string;
  organization: string;
};

export interface Feature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    id: string;
    name: string;
    description?: string;
    verified: boolean;
  };
}

export const AssetsClient = (headers: Headers) => {
  const basePath = Path("engine/assets/");
  const baseClient = BaseRestClient<AssetParams, Asset>(basePath, headers);
  return {
    ...baseClient,
    geojson: async () =>
      (
        await get<{ features: Feature[] }>(
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
