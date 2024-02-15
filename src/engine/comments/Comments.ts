import { BaseRestClient } from '../../rest/BaseRestClient.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface SplightCommentParams {
  message: string;
  object_type: string;
  object_id: string;
  picture_color: string;
  edited_at?: string;
  edited_by?: string;
}

export interface SplightComment extends SplightCommentParams {
  id: string;
  created_at: string;
  user_id: string;
  username: string;
  name: string;
  email: string;
}

export const CommentsClient = (headers: Headers) => {
  const basePath = Path('v2/engine/comment/comments/');
  const baseClient = BaseRestClient<SplightCommentParams, SplightComment>(
    basePath,
    headers
  );
  return {
    ...baseClient,
  };
};
