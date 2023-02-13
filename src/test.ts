import setup from "./setup.js";

const splight = setup.configure();
const assets = await splight.assets.list();
const asset_attributes = await splight.assets.attributes(
  "c7059ae2-ee90-4d0a-92df-757c5d390814"
);

const components = await splight.components.list();
const attributes = await splight.attributes.list();
const queries = await splight.queries.list();
const secrets = await splight.secrets.list();

console.log(assets);
console.log(asset_attributes);
console.log(components);
console.log(attributes);
console.log(queries);
console.log(secrets);
