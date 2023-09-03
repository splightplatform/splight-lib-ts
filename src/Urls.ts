type SplightWindow = typeof window & { ENV: Record<string, string> };

export const API_HOST =
  (typeof window !== 'undefined'
    ? (window as SplightWindow).ENV.API_BASE_URL
    : process.env.API_BASE_URL) ?? 'https://api.splight-ai.com/';

export const MOCK_HOST =
  typeof window !== 'undefined'
    ? (window as SplightWindow).ENV.MOCK_API_BASE_URL
    : process.env.MOCK_API_BASE_URL ??
      'https://splight-web-mock-chi.vercel.app/';

export const Path = (base_path: string) => {
  const base_url = new URL(base_path).href;
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
