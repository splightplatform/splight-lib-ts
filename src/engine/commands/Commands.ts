import { Path } from '../../Urls.js';
import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';

export type CommandEvent = {
  id: string;
  timestamp: string;
  value: string;
};

export interface CommandActionParams {
  name?: string;
  asset: {
    id: string;
    name: string;
  };
  attribute: {
    id: string;
    name: string;
    type: string;
  };
  value: string;
  conditional_input_value: string;
}

export interface CommandAction extends CommandActionParams {
  id?: string;
}

export interface CommandParams {
  name: string;
  asset: {
    id: string;
    name: string;
  };
  input_type?: string;
  input_value?: string;
  actions?: CommandAction[];
}

export interface Command extends CommandParams {
  id: string;
  last_event_timestamp?: string;
}

export const CommandsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/asset/commands/');
  const baseClient = BaseRestClient<CommandParams, Command>(basePath, headers);
  return {
    ...baseClient,
    trigger: ({
      pk,
    }: { pk: string } & Record<string, string | boolean | number>) =>
      post(basePath.slash(pk).slash('trigger').url, {}, headers, {}),
    events: async (
      pk: string,
      params: Partial<{ page_size: number; page: number }>
    ) =>
      await get<{ results: CommandEvent[]; next: string | null }>(
        basePath.slash(pk).slash('events').url,
        headers,
        ...[params]
      ),
  };
};
