import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { DataFlowGraph, Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface AttributeParams {
  name: string;
  pinned_at?: string | null;
  asset?: string;
  type?: string;
  unit?: string;
}

export interface Attribute extends AttributeParams {
  id?: string;
  status: string;
  solution?: { id: string; name: string };
}

export interface AttributeSetParams {
  value: string;
}

export interface AttributeGet {
  attribute: Attribute;
  value: string;
  timestamp: string;
}

export const AttributesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/asset/attributes/');
  const baseClient = BaseRestClient<AttributeParams, Attribute>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    dataFlow: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<DataFlowGraph>(
        basePath.slash(pk).slash('data-flow').url,
        headers,
        params
      ),
    set: async (attributeId: string, setpoint: AttributeSetParams) =>
      post<AttributeSetParams, void>(
        basePath.slash(attributeId).slash('set').url,
        setpoint,
        headers
      ),
    get: async (attributeId: string) =>
      get<AttributeGet>(basePath.slash(attributeId).slash('get').url, headers),
  };
};
