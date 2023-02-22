import { Headers } from "../types.js";
import { NotificationsClient } from "./index.js";

export const Account = (headers: Headers) => {
  return {
    notifications: NotificationsClient(headers),
  };
};
