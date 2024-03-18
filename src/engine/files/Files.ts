import { AxiosProgressEvent } from 'axios';
import { get, put } from '../../rest/BaseMethods.js';
import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers, Tag } from '../../types.js';
import { Path } from '../../Urls.js';
import { Asset } from '../assets/Assets.js';

export interface FolderParams {
  name: string;
  description?: string;
  parent?: string;
  assets?: Asset[];
  tags?: Tag[];
}

export interface FileParams {
  name: string;
  description?: string;
  parent?: string;
  assets?: Asset[];
  tags?: Tag[];
}

export interface _File extends Omit<FileParams, 'file'> {
  id: string;
  path?: string;
  created_at?: string;
  extension: string;
}

export interface _Folder extends FolderParams {
  id: string;
  path?: string;
  created_at?: string;
}

export interface FileSystemObject {
  id: string;
  name: string;
  description: string;
  path?: string;
  created_at?: string;
  type: 'file' | 'folder';
}

export interface FileURL {
  url: string;
}

export const FilesClient = (headers: Headers) => {
  const basePath = Path('v2/engine/file/files/');
  const baseClient = BaseRestClient<FileParams, _File>(basePath, headers);
  return {
    ...baseClient,
    uploadURL: (fileId: string) =>
      get<FileURL>(basePath.slash(fileId).slash('upload_url').url, headers, {}),
    downloadURL: (fileId: string) =>
      get<FileURL>(
        basePath.slash(fileId).slash('download_url').url,
        headers,
        {}
      ),
    upload: (
      fileId: string,
      data: Blob,
      onUploadProgress?: (progress: AxiosProgressEvent) => void
    ) =>
      get<FileURL>(
        basePath.slash(fileId).slash('upload_url').url,
        headers,
        {}
      ).then((response) => put(response.url, data, {}, onUploadProgress)),
    download: (
      fileId: string,
      onDownloadProgress?: (progress: AxiosProgressEvent) => void
    ) =>
      get<FileURL>(
        basePath.slash(fileId).slash('download_url').url,
        headers,
        {}
      ).then((response) =>
        get<Blob>(response.url, {}, {}, 'blob', onDownloadProgress)
      ),
  };
};

export const FoldersClient = (headers: Headers) => {
  const basePath = Path('v2/engine/file/folders/');
  const baseClient = BaseRestClient<FolderParams, _Folder>(basePath, headers);
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
