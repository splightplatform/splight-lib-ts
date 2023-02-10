import { useBaseRestClient } from "./rest/useBaseRestClient.js";
import setup from "./setup.js";

const splight = setup.configure();

const assets = await splight.assets.list();
const asset_attributes = await splight.assets.attributes(
  "c7059ae2-ee90-4d0a-92df-757c5d390814"
);

const components = await splight.components.list();

console.log(assets);
console.log(asset_attributes);
console.log(components);
