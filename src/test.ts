import setup from "./Setup.js";
async function main() {
  const splight = setup.configure();

  const { results, next } = await splight.engine.queries.execute({
    output_format: "Number",
    limit: 10,
    filters: {
      attribute: "9b05f7bb-d295-406f-8e80-45bac8bf948a",
    },
    target: "value",
    source_type: "Native",
  });
}
main();
