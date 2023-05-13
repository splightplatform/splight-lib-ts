import { get } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface FileParams {
  file: File;
  description?: string;
  encrypted: boolean;
}

export interface _File extends Omit<FileParams, 'file'> {
  id: string;
  url: string;
  extension: string;
  file: string;
}

export const FilesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/files/');
  const baseClient = BaseRestClient<FileParams, _File>(basePath, headers);
  const responseType = 'blob';
  return {
    ...baseClient,
    download: (fileId: string) =>
      get<Blob>(
        basePath.slash(fileId).slash('download').url,
        headers,
        {},
        responseType
      ),
  };
};
