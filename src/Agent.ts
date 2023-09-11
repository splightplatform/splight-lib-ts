import { Headers } from './types.js';
import { AgentReleaseClient } from './agent/index.js';

export const Agent = (headers: Headers) => {
  return {
    release: AgentReleaseClient(headers),
  };
};
