import { BaseRestClient } from "../rest/BaseRestClient.js";
import { Headers } from "../types.js";
import { Path } from "../Urls.js";

export interface AgreementParams {
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  type: "ECOSYSTEM" | "CUSTOMER" | "DEVELOPER";
  file: string;
  organization_id?: string;
}

export interface Agreement extends AgreementParams {
  id: string;
}

export const AgreementsClient = (headers: Headers) => {
  const basePath = Path("backoffice/agreements/");
  const baseClient = BaseRestClient<AgreementParams, Agreement>(
    basePath,
    headers
  );
  return baseClient;
};
