import { getHeaders } from './rest/index.js';
import { Headers } from './types.js';
import { Engine } from './Engine.js';
import { Account } from './Account.js';
import { Hub } from './Hub.js';
import { Backoffice } from './Backoffice.js';
import { Agent } from './Agent.js';

export const Splight = (requestHeaders?: Headers) => {
  const headers = requestHeaders ?? getHeaders();

  return {
    engine: Engine(headers),
    account: Account(headers),
    hub: Hub(headers),
    backoffice: Backoffice(headers),
    agent: Agent(headers),
  };
};

export default Splight;
