import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export type AssetActionEvent = {
  id: string;
  timestamp: string;
  setpoints_triggered: number;
};

export interface AssetActionSetpoint {
  id?: string;
  name?: string;
  value: string;
  attribute: {
    id: string;
    name: string;
  };
}

export interface AssetActionParams {
  id?: string;
  name: string;
  asset: {
    id: string;
    name: string;
  };
  setpoints: AssetActionSetpoint[];
}

export interface AssetAction extends AssetActionParams {
  id: string;
  last_event_timestamp: string;
}

export const ActionsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/asset/actions/');
  const baseClient = BaseRestClient<AssetActionParams, AssetAction>(
    basePath,
    headers
  );
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
      await get<{ results: AssetActionEvent[]; next: string | null }>(
        basePath.slash(pk).slash('events').url,
        headers,
        ...[params]
      ),
  };
};
