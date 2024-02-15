import { get } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, Asset, BasePaginatedCollection } from '../../types.js';
import { Path } from '../../Urls.js';
import { BaseRelatedAssetObj } from '../assets/Assets.js';

export interface FolderParams {
  name: string;
  description?: string;
  parent?: string;
}

export interface FileParams extends Partial<BaseRelatedAssetObj> {
  file?: File;
  description?: string;
  assets?: Asset[];
  parent?: string;
}

export interface _File extends Omit<FileParams, 'file'> {
  id: string;
  url: string;
  name: string;
  extension: string;
  path?: string;
  created_at?: string;
  assets?: Asset[];
  file?: string;
  type: string;
}

export interface Folder extends FolderParams {
  id: string;
  path: Folder[];
  assets?: Asset[];
  type: string;
}

export interface FileSystemObject {
  id: string;
  name: string;
  description: string;
  created_at: string;
  content_type: string;
  path: string;
  url: string;
  type: 'file' | 'folder';
}

export interface FileSystemFolder
  extends BasePaginatedCollection<FileSystemObject> {
  current_folder: Folder;
}

export const FilesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/file/files/');
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

export const FoldersClient = (headers: Headers) => {
  const basePath = Path('v2/engine/file/folders/');
  const baseClient = BaseRestClient<FolderParams, Folder>(basePath, headers);
  return {
    ...baseClient,
  };
};

export const FileSystemClient = (headers: Headers) => {
  const basePath = Path('v2/engine/file/filesystem/');
  const { list } = BaseRestClient<FileSystemObject, FileSystemObject>(
    basePath,
    headers
  );
  return { list };
};
