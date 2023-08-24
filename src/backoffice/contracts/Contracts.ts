import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface ContractParams {
  name: string;
  description: string;
  type: 'ECOSYSTEM' | 'CUSTOMER' | 'DEVELOPER';
  file: string;
  organization_id?: string;
}

export interface Contract extends ContractParams {
  id: string;
  created_at: string;
  updated_at: string;
}

export const ContractsClient = (headers: Headers) => {
  const basePath = Path('v2/backoffice/contracts/');
  const baseClient = BaseRestClient<ContractParams, Contract>(
    basePath,
    headers
  );
  return baseClient;
};
