import { get } from "../rest/BaseMethods.js";
import { BaseRestClient } from "../rest/BaseRestClient.js";
import { Headers } from "../types.js";
import { Path } from "../Urls.js";
import { OrganizationProfile } from "../backoffice/Organizations.js";

export interface Organinzation {
  id: string;
  name: string;
  display_name: string;
}

export type OrganinzationParams = Omit<Organinzation, "id">;

export const MeClient = (headers: Headers) => {
  const basePath = Path("account/user/me/");
  return {
    profile: () => get(basePath.url, headers),
    permissions: () => get(basePath.slash("permissions").url, headers),
    organizations: () =>
      get<Organinzation[]>(Path("account/user/organizations/").url, headers),
  };
};
