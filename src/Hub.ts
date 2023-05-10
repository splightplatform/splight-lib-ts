import { Headers } from './types.js';
import { ComponentsClient, OrganizationsClient } from './hub/index.js';

export const Hub = (headers: Headers) => {
  return {
    components: ComponentsClient(headers),
    organization: OrganizationsClient(headers),
  };
};
