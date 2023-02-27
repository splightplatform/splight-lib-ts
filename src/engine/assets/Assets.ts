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

export interface Asset extends AssetParams {
  id: string;
  verified: boolean;
  description: string;
}

export const AssetsClient = (headers: Headers) => {
  const basePath = Path("engine/assets/");
  const baseClient = BaseRestClient<AssetParams, Asset>(basePath, headers);
  return {
    ...baseClient,
    attributes: (pk: string) =>
      get<PaginatedCollection<Attribute>>(
        basePath.slash(pk).slash("attributes").url,
        headers
      ),
  };
};
