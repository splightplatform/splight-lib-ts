import { BaseRestClient } from "../../rest/BaseRestClient.js";
import { Headers, Optional } from "../../types.js";
import { Path } from "../../Urls.js";
import { Command } from "../index.js";

type CommandParams = Optional<Command, "fields">;

export const ComponentCommandsClient = (headers: Headers) => {
  const basePath = Path("engine/component/commands/");
  const baseClient = BaseRestClient<CommandParams, Command>(basePath, headers);
  return baseClient;
};
