import { Path } from '../../Urls.js';
import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { AssetAction, DataFlowGraph, Headers } from '../../types.js';

export type CommandEvent = {
  id: string;
  timestamp: string;
  actions_triggered: number;
};

export interface CommandParams {
  name: string;
  description: string;
  actions?: AssetAction[];
}

export interface Command extends CommandParams {
  id: string;
  last_event_timestamp?: string;
}

export const CommandsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/command/commands/');
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
    dataFlow: ({
      pk,
      ...params
    }: { pk: string } & Record<string, string | boolean | number>) =>
      get<DataFlowGraph>(
        basePath.slash(pk).slash('data-flow').url,
        headers,
        params
      ),
  };
};
