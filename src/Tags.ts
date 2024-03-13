import { TagsClient } from './tags/Tags.js';
import { Headers } from './types.js';

export const Tags = (headers: Headers) => {
  return {
    tags: TagsClient(headers),
  };
};
