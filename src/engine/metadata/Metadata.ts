import { get } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface MetadataParams {
  name: string;
  asset?: string;
  type?: string;
  value?: string;
  unit?: string;
}

export interface Metadata extends MetadataParams {
  id?: string;
  solution?: { id: string; name: string };
}

export interface MetadataRelationships {
  metadata: Metadata;
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

export const MetadataClient = (headers: Headers) => {
  const basePath = Path('v2/engine/asset/metadata/');
  const baseClient = BaseRestClient<MetadataParams, Metadata>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    dataFlow: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<MetadataRelationships>(
        basePath.slash(pk).slash('data-flow').url,
        headers,
        params
      ),
  };
};
