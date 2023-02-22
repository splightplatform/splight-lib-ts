import { BaseRestClient } from "../rest/BaseRestClient.js";
import { Headers } from "../types.js";
import { Path } from "../Urls.js";

export interface FileParams {
  file: string;
  extension: string;
  description?: string;
  encrypted: boolean;
}

export interface File extends FileParams {
  id: string;
  description: string;
  url: string;
  extension: string;
  encrypted: boolean;
}

export const FilesClient = (headers: Headers) => {
  const basePath = Path("engine/files/");
  const baseClient = BaseRestClient<FileParams, File>(basePath, headers);
  return baseClient;
};
