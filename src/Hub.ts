import {
  ComponentsClient,
  OrganizationsClient,
  SolutionsClient,
} from './hub/index.js';
import { Headers } from './types.js';

export const Hub = (headers: Headers) => {
  return {
    components: ComponentsClient(headers),
    organization: OrganizationsClient(headers),
    solutions: SolutionsClient(headers),
  };
};
