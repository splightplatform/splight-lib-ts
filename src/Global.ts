type SplightWindow = typeof window & { ENV: Record<string, string> };

export let API_HOST =
  (typeof window !== 'undefined'
    ? (window as SplightWindow).ENV.API_BASE_URL
    : process.env.API_BASE_URL) ?? 'https://api.splight-ai.com/';

export const Global = {
  getAPIHost: () => API_HOST,
  setAPIHost: (newAPIHost?: string) => {
    if (newAPIHost !== undefined) {
      API_HOST = newAPIHost ?? API_HOST;
    }
  },
};
