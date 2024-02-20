// Organizations

import { BaseRestClient } from '../../../rest/BaseRestClient.js';
import { Headers } from '../../../types.js';
import { Path } from '../../../Urls.js';

export interface AgentRelease {
  version_tag: string;
  download_url: string;
}

export const AgentReleaseClient = (headers: Headers) => {
  const basePath = Path('v2/plugin/agent/');

  const { retrieve } = BaseRestClient<null, AgentRelease>(basePath, headers);
  return {
    retrieve,
  };
};
