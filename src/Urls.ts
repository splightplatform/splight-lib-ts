type SplightWindow = typeof window & { ENV: Record<string, string> };

export const API_HOST = 'https://api.splight-ai.com/v2/';

export const Path = (base_path: string) => {
  const base_url = new URL(base_path, API_HOST).href;
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
