import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface FileParams {
  file: File;
  description?: string;
  encrypted: boolean;
}

export interface File2 extends Omit<FileParams, 'file'> {
  id: string;
  url: string;
  extension: string;
  file: string;
}

export const FilesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/files/');
  const baseClient = BaseRestClient<FileParams, File2>(basePath, headers);
  return baseClient;
};
