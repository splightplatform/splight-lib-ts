import { AgreementsClient } from './landing/Agreements.js';
import { ContactClient } from './landing/Contact.js';
import { NewsletterClient } from './landing/Newsletter.js';
import { Headers } from './types.js';

export const Landing = (headers: Headers) => {
  return {
    newsletter: NewsletterClient(headers),
    agreements: AgreementsClient(headers),
    contact: ContactClient(headers),
  };
};
