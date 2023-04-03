import { BaseRestClient } from "../../rest/BaseRestClient.js";
import { Headers } from "../../types.js";
import { Path } from "../../Urls.js";

export interface DashboardParams {
  name: string;
  description?: string;
}

export interface Dashboard extends DashboardParams {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export const DashboardsClient = (headers: Headers) => {
  const basePath = Path("engine/dashboards/");
  const baseClient = BaseRestClient<DashboardParams, Dashboard>(
    basePath,
    headers
  );
  return baseClient;
};
