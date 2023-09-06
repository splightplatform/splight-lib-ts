let API_HOST = '';

export const Global = {
  getAPIHost: () => API_HOST,
  setAPIHost: (newAPIHost?: string) => {
    if (newAPIHost !== undefined) {
      API_HOST = newAPIHost ?? API_HOST;
    }
  },
};
