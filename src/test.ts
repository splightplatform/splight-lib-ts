import setup from "./setup.js";

async function test() {
  const { engine, account } = setup.configure();
  const { results: assets, next } = await engine.assets.list();
  const notifications = await account.notifications.list();
  notifications;
}

test();
