import { get, post } from '../../rest/BaseMethods.js';
import { BasePaginatedCollection, Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface ChatMessageParams {
  thread_id: string;
  content: string;
}

export interface ChatMessage extends ChatMessageParams {
  id: string;
  role: 'user' | 'assistant';
}

export const GepettoClient = (headers: Headers) => {
  const basePath = Path('v2/plugin/gepetto/');
  return {
    getMessages: (params?: { thread_id?: string }) =>
      get<BasePaginatedCollection<ChatMessage>>(
        basePath.slash('messages').url,
        headers,
        params
      ),
    sendMessage: (message: ChatMessageParams) =>
      post<ChatMessageParams, ChatMessage>(
        basePath.slash('ask').url,
        message,
        headers
      ),
  };
};
