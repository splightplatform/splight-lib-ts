import { get, post } from '../../rest/BaseMethods.js';
import { withGetNext } from '../../rest/BaseRestClient.js';
import { BasePaginatedCollection, Empty, Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface ChatMessageParams {
  thread_id: string;
  content: string;
}

export interface ChatMessage extends ChatMessageParams {
  id: string;
  role: 'user' | 'assistant';
  name?: string;
  user_id?: string;
  email?: string;
  username?: string;
  picture_color?: string;
}

export const AIClient = (headers: Headers) => {
  const basePath = Path('v2/plugin/ai/');
  return {
    getMessages: (params?: { thread_id?: string; page_size?: number }) =>
      get<BasePaginatedCollection<ChatMessage>>(
        basePath.slash('messages').url,
        headers,
        params
      ).then((results) => withGetNext(results)),
    sendMessage: (message: ChatMessageParams) =>
      post<ChatMessageParams, ChatMessage>(
        basePath.slash('ask').url,
        message,
        headers
      ),
    clearThread: (thread_id: string) =>
      post<{ thread_id: string }, Empty>(
        basePath.slash('clear-thread').url,
        { thread_id },
        headers
      ),
  };
};
