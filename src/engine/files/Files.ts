import { get } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, Asset, PaginatedCollection } from '../../types.js';
import { Path } from '../../Urls.js';

export interface FolderParams {
  name: string;
  parent?: string;
}

export interface FileParams {
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
  created_at?: string;
  assets?: Asset[];
}

export interface Folder extends FolderParams {
  id: string;
  path: Folder[];
}

export interface FileSystemObject {
  id: string;
  name: string;
  description: string;
  created_at: string;
  content_type: string;
  url: string;
  type: 'file' | 'folder';
}

export interface FileSystemFolder
  extends PaginatedCollection<FileSystemObject> {
  current_folder: Folder;
}

const FilesClient = (headers: Headers) => {
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

const FoldersClient = (headers: Headers) => {
  const basePath = Path('v2/engine/file/folders/');
  const baseClient = BaseRestClient<FolderParams, Folder>(basePath, headers);
  return {
    ...baseClient,
  };
};

const FileSystemClient = (headers: Headers) => {
  const basePath = Path('v2/engine/file/filesystem/');
  return {
    listContent: (folderId?: string) =>
      get<FileSystemFolder>(basePath.url, headers, { folder: folderId }),
  };
};

export const FileClient = (headers: Headers) => {
  return {
    files: FilesClient(headers),
    folders: FoldersClient(headers),
    fileSystem: FileSystemClient(headers),
  };
};
