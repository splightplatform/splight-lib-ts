let API_HOST = 'https://api.splight-ai.com/';

export const Global = {
  getAPIHost: () => API_HOST,
  setAPIHost: (newAPIHost?: string) => {
    if (newAPIHost !== undefined) {
      API_HOST = newAPIHost ?? API_HOST;
    }
  },
};
