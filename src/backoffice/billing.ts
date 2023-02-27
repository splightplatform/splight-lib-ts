import { get } from "../rest/BaseMethods.js";
import { BaseRestClient } from "../rest/BaseRestClient.js";
import { Headers } from "../types.js";
import { Path } from "../Urls.js";

export const BillingClient = (headers: Headers) => {
  const basePath = Path("backoffice/billing/");

  return {
    options: () => get(basePath.slash("options/").url, headers),
    fixedInvoicePricing: BaseRestClient(
      basePath.slash("fixed_invoice_pricing/"),
      headers
    ),
  };
};
