import { BaseRestClient } from "../../rest/BaseRestClient.js";
import { Headers } from "../../types.js";
import { Path } from "../../Urls.js";

export interface AttributeParams {
  name: string;
}
export interface Attribute extends AttributeParams {
  id: string;
}

export const AttributesClient = (headers: Headers) => {
  const basePath = Path("engine/attributes/");
  const baseClient = BaseRestClient<AttributeParams, Attribute>(
    basePath,
    headers
  );
  return baseClient;
};
