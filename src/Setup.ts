import { getHeaders } from './rest/index.js';
import { Headers } from './types.js';
import { Engine } from './Engine.js';
import { Account } from './Account.js';
import { Hub } from './Hub.js';
import { Agent } from './Agent.js';
import { Search } from './Search.js';

export const Splight = (requestHeaders?: Headers) => {
  const headers = requestHeaders ?? getHeaders();

  return {
    engine: Engine(headers),
    account: Account(headers),
    hub: Hub(headers),
    agent: Agent(headers),
    search: Search(headers),
  };
};

export default Splight;
