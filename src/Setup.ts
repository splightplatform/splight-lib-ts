import { getHeaders } from './rest/index.js';
import { Headers } from './types.js';
import { Engine } from './Engine.js';
import { Account } from './Account.js';
import { Hub } from './Hub.js';
import { Backoffice } from './Backoffice.js';
import { Landing } from './Landing.js';

export const Splight = (requestHeaders?: Headers) => {
  const headers = requestHeaders ?? getHeaders();

  return {
    engine: Engine(headers),
    account: Account(headers),
    hub: Hub(headers),
    backoffice: Backoffice(headers),
    landing: Landing(headers),
  };
};

export default Splight;
