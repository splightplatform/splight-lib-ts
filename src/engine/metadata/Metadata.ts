import { get } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface MetadataParams {
  name: string;
  asset?: string;
  type?: string;
}

export interface Metadata extends MetadataParams {
  id?: string;
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
  const basePath = Path('v2/engine/assetmetadata/');
  const baseClient = BaseRestClient<MetadataParams, Metadata>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    relationships: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<MetadataRelationships>(
        basePath.slash(pk).slash('relationship').url,
        headers,
        params
      ),
  };
};
