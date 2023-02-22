import { BaseRestClient } from "../rest/BaseRestClient.js";
import { Headers } from "../types.js";
import { Path } from "../Urls.js";

export interface Notification {
  id: string;
  message: string;
  target_id?: string;
  target_type?: string;
  redirect_url?: string;
  volatile?: boolean;
  created_at?: string;
  source_id?: string;
  source_type?: string;
  title?: string;
  seen?: boolean;
  scope?: string;
  isError?: boolean;
  timeAliveInMs?: number;
}

export const NotificationsClient = (headers: Headers) => {
  const basePath = Path("account/notifications/");
  const baseClient = BaseRestClient<Notification>(basePath, headers);
  return {
    list: baseClient.list,
  };
};
