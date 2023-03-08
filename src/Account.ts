import { Headers } from "./types.js";
import { NotificationsClient } from "./account/index.js";
import { MeClient } from "./account/Me.js";

export const Account = (headers: Headers) => {
  return {
    notifications: NotificationsClient(headers),
    me: MeClient(headers),
  };
};
