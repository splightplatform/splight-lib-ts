import setup from "./setup.js";

async function main() {
  const { engine } = setup.configure();

  const asset = await engine.assets.retrieve("test");
}

main();
