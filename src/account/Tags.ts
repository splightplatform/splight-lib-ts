import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface TagParams {
  name: string;
}

export interface Tag extends TagParams {
  id: string;
}

export const TagsClient = (headers: Headers) => {
  const basePath = Path('v2/account/tags/');
  const baseClient = BaseRestClient<TagParams, Tag>(basePath, headers);
  return {
    ...baseClient,
  };
};
