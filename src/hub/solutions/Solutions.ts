import { Path } from '../../Urls.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, Solution } from '../../types.js';

export interface HubSolutionParams {
  name: string;
  description: string;
  version: string;

  privacy_policy?: string;
  tags: string[];
  main_file: File;
  values_file: File;
  variables_file: File;
  readme_file: File;
}

export interface HubSolution extends HubSolutionParams {
  last_modified: string;
  id: string;
}

export const SolutionsVersionsClient = (headers: Headers) => {
  const basePath = Path('v2/hub/solution/versions/');
  const baseClient = BaseRestClient<Solution>(basePath, headers);
  return {
    ...baseClient,
  };
};

export const SolutionsClient = (headers: Headers) => {
  const basePath = Path('v2/hub/solution/solutions/');
  const baseClient = BaseRestClient<HubSolutionParams, HubSolution>(
    basePath,
    headers
  );
  return {
    ...baseClient,
    versions: SolutionsVersionsClient(headers),
  };
};
