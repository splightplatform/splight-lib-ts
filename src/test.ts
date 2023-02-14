import setup from "./setup.js";

const { engine, account } = setup.configure();
const { results: assets, next } = await engine.assets.list();

const notifications = await account.notifications.list();
notifications;

/* Alternatively:
 * const splight = setup.configure();
 * const { results: assets, next } = await splight.engine.assets.list();
 *
 */
