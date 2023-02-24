import { Headers } from "./types.js";
import { NotificationsClient } from "./account/index.js";

export const Account = (headers: Headers) => {
  return {
    notifications: NotificationsClient(headers),
  };
};
