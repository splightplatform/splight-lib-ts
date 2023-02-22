import setup from "./Setup.js";
async function main() {
  const splight = setup.configure();

  await splight.engine.queries.execute({
    output_format: "Boolean",
    target: "value",
    filters: {
      "asset.name": "test",
    },
    limit: 10000,
    skip: 0,
    timezone_offset: 0,
    source: "default",
    name: "test msquery",
    description: "Desc",
    source_type: "Native",
    source_component_id: null,
    source_component_label: null,
  });
}
main();
