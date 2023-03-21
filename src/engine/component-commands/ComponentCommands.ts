import { BaseRestClient } from "../../rest/BaseRestClient.js";
import { Headers, Optional } from "../../types.js";
import { Path } from "../../Urls.js";
import { ComponentCommand } from "../index.js";

type ComponentCommandParams = Optional<ComponentCommand, "fields">;

export const ComponentCommandsClient = (headers: Headers) => {
  const basePath = Path("engine/component/commands/");
  const baseClient = BaseRestClient<ComponentCommandParams, ComponentCommand>(
    basePath,
    headers
  );
  return baseClient;
};
