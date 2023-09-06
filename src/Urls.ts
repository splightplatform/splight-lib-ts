import { Global } from './Global.js';

export const Path = (base_path: string) => {
  const base_url = new URL(base_path, Global.getAPIHost()).href;
  return {
    url: base_url,
    slash: (next_segment: string, trailing_slash = true) =>
      Path(
        `${base_url}${base_url.endsWith('/') ? '' : '/'}${next_segment}${
          trailing_slash ? '/' : ''
        }`
      ),
  };
};

export type Path = ReturnType<typeof Path>;
