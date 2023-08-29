import { get } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface AttributeParams {
  name: string;
  asset?: string;
}

export interface Attribute extends AttributeParams {
  id?: string;
}

export interface AttributeRelationships {
  attribute: Attribute;
  relationship: {
    routine: {
      id: string;
      name: string;
    };
    component: {
      id: string;
      name: string;
    };
    type: 'input' | 'output';
  }[];
}

export const AttributesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/attributes/');
  const baseClient = BaseRestClient<AttributeParams, Attribute>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    relationships: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<AttributeRelationships>(
        basePath.slash(pk).slash('relationship').url,
        headers,
        params
      ),
  };
};
