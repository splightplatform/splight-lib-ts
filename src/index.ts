import { Splight } from './Setup.js';
import { Global } from './Global.js';
import { Path } from './Urls.js';
import { BaseRestClient, getHeaders } from './rest/BaseRestClient.js';

export * from './rest/BaseMethods.js';
export * from './types.js';
export { Global };
export { Path };
export { BaseRestClient, getHeaders };

export { Splight } from './Setup.js';

export default Splight;
