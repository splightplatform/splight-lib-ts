import { get } from '../rest/BaseMethods.js';
import { ComponentSize, Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface CapacityOptions {
  type: ComponentSize;
  cpu_requested: number;
  memory_requested: string;
}

export interface DeploymentOptions {
  capacity_options: CapacityOptions[];
  log_level_options: number[];
  restart_policy_options: string[];
}

export const DeploymentsClient = (headers: Headers) => {
  const deploymentOptionsPath = Path('v2/engine/deployment/options');

  return {
    options: () => get<DeploymentOptions>(deploymentOptionsPath.url, headers),
  };
};
