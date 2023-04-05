import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, Optional } from '../../types.js';
import { Path } from '../../Urls.js';

//TODO: Move this type to this file
import { ComponentObject } from '../index.js';

export type ComponentObjectParams = Optional<
  Omit<ComponentObject, 'id'>,
  'description'
>;

export const ComponentObjectsClient = (headers: Headers) => {
  const basePath = Path('engine/component/objects/');
  const baseClient = BaseRestClient<ComponentObjectParams, ComponentObject>(
    basePath,
    headers
  );
  return baseClient;
};
