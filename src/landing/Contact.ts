import { post } from '../rest/BaseMethods.js';
import { Headers } from '../types.js';
import { Path } from '../Urls.js';

export interface Contact {
  name: string;
  email: string;
  company_name: string;
  message: string;
}

export const ContactClient = (headers: Headers) => {
  const basePath = Path('v2/landing/contact/');

  return {
    create: (data: Contact, params: Record<string, string>) =>
      post<Contact, Contact>(basePath.url, data, headers, params),
  };
};
