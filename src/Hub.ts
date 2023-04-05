import { Headers } from './types.js';
import { ComponentsClient } from './hub/index.js';

export const Hub = (headers: Headers) => {
  return {
    components: ComponentsClient(headers),
  };
};
