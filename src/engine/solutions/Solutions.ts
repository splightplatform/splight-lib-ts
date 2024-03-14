import { Path } from '../../Urls.js';
import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';

export interface SolutionResource {
  name: string;
  type: string; //TODO add choices
  actions: string[]; //TODO add choices
}

export interface SolutionPlan {
  timestamp: string;
  resources: SolutionResource[];
}

export interface SolutionParams {
  name: string;
  description: string;
  hub_solution: string;
  // TODO add values_file
  pinned_at: string | null;
}

export interface Solution extends SolutionParams {
  id: string;
  status: string; // TODO enum
}

export const SolutionsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/solution/solutions/');
  const baseClient = BaseRestClient<SolutionParams, Solution>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    apply_plan: (solutionId: string) =>
      post(basePath.slash(solutionId).slash('apply').url, null, headers),
    destroy_plan: (solutionId: string) =>
      post(basePath.slash(solutionId).slash('destroy').url, null, headers),
    plan: (solutionId: string) =>
      post(basePath.slash(solutionId).slash('plan').url, null, headers),
    getPlan: (solutionId: string) =>
      get<SolutionPlan>(basePath.slash(solutionId).slash('plan').url, headers),
  };
};
