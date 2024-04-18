import { Path } from '../../Urls.js';
import { get, post } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, HubSolution } from '../../types.js';

export interface SolutionResourceChange {
  actions: ('no-op' | 'create' | 'read' | 'update' | 'delete')[];
  before: Record<string, unknown>;
  after: Record<string, unknown>;
}

export interface SolutionResource {
  name: string;
  type:
    | 'Alert'
    | 'Asset'
    | 'Attribute'
    | 'Metadata'
    | 'Component'
    | 'ComponentRoutine'
    | 'Dashboard'
    | 'Chart'
    | 'Tab'
    | 'File'
    | 'Folder'
    | 'Function'
    | 'Secret'
    | 'Solution';
  change: SolutionResourceChange;
}

export interface SolutionPlan {
  timestamp: string;
  resources: SolutionResource[];
}

export interface SolutionParams {
  name: string;
  description: string;
  hub_solution: HubSolution;
  pinned_at: string | null;
  values_file: string;
}

export interface Solution extends SolutionParams {
  id: string;
  status: 'not_applied' | 'pending' | 'in_progress' | 'success' | 'failed';
}

export const SolutionsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/solution/solutions/');
  const baseClient = BaseRestClient<SolutionParams, Solution>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    applyPlan: (solutionId: string) =>
      post(basePath.slash(solutionId).slash('apply').url, null, headers),
    destroyPlan: (solutionId: string) =>
      post(basePath.slash(solutionId).slash('destroy').url, null, headers),
    plan: (solutionId: string) =>
      post(basePath.slash(solutionId).slash('plan').url, null, headers),
    getPlan: (solutionId: string) =>
      get<SolutionPlan>(basePath.slash(solutionId).slash('plan').url, headers),
    uploadValues: (solutionId: string, values: File) =>
      post<{ values_file: File }, Solution>(
        basePath.slash(solutionId).slash('upload-values').url,
        { values_file: values },
        headers
      ),
    buildLogs: (pk: string) =>
      get<string[]>(basePath.slash(pk).slash('build-logs').url, headers),
  };
};
