import { getHeaders } from './rest/index.js';
import { Headers } from './types.js';
import { Engine } from './Engine.js';
import { Account } from './Account.js';
import { Hub } from './Hub.js';
import { Plugin } from './Plugin.js';
import { Tags } from './Tags.js';

export const Splight = (requestHeaders?: Headers) => {
  const headers = requestHeaders ?? getHeaders();

  return {
    engine: Engine(headers),
    account: Account(headers),
    hub: Hub(headers),
    plugin: Plugin(headers),
    tags: Tags(headers),
  };
};

export default Splight;
