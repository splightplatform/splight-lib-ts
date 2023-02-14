import setup from "./setup.js";

const splight = setup.configure();

const { results: assets, next } = await splight.assets.list();

assets;
