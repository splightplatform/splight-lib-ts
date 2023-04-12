import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, Optional } from '../../types.js';
import { Path } from '../../Urls.js';
import { Command } from '../index.js';

export type CommandParams = Optional<Command, 'fields' | 'id' | 'status'>;

export const ComponentCommandsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/component/commands/');
  const baseClient = BaseRestClient<CommandParams, Command>(basePath, headers);
  return baseClient;
};
