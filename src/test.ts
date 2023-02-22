import setup from "./Setup.js";

async function main() {
  const splight = setup.configure();

  const { results, next } = await splight.engine.assets.list();
  console.log(results);
}
main();
