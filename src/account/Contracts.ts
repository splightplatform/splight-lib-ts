import { BaseRestClient } from '../rest/BaseRestClient.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface ContractParams {
  name: string;
  description: string;
  type: 'ECOSYSTEM' | 'CUSTOMER' | 'DEVELOPER';
  file: string;
  organization_id?: string;
  organization_name?: string;
}

export interface Contract extends ContractParams {
  id: string;
  created_at: string;
  updated_at: string;
}

export const ContractsClient = (headers: Headers) => {
  const basePath = Path('v2/account/contracts/');
  const { list, retrieve } = BaseRestClient<ContractParams, Contract>(
    basePath,
    headers
  );
  return {
    list,
    retrieve,
  };
};
