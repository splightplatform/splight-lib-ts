import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface LauncherParams {
  name: string;
}

export interface Launcher extends LauncherParams {
  id: string;
  status: string;
  last_status_change: string;
}

export const LauncherClient = (headers: Headers) => {
  const basePath = Path('v2/engine/launchers/');
  const baseClient = BaseRestClient<LauncherParams, Launcher>(
    basePath,
    headers
  );
  return baseClient;
};
