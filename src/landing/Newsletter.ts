import { post } from '../rest/BaseMethods.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface Newsletter {
  email: string;
}

export const NewsletterClient = (headers: Headers) => {
  const basePath = Path('v2/landing/newsletter/');

  return {
    create: (data: Newsletter, params: Record<string, string>) =>
      post<Newsletter, Newsletter>(basePath.url, data, headers, params),
  };
};
