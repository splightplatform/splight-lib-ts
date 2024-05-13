import { Headers } from './types.js';
import { AgentReleaseClient } from './plugin/agent/index.js';
import { CommunicationClient } from './plugin/communication/index.js';
import { WeatherClient } from './plugin/weather/index.js';
import { SearchClient } from './plugin/search/index.js';
import { GepettoClient } from './plugin/gepetto/Gepetto.js';

export const Plugin = (headers: Headers) => {
  return {
    agent: AgentReleaseClient(headers),
    communication: CommunicationClient(headers),
    weather: WeatherClient(headers),
    gepetto: GepettoClient(headers),
    search: SearchClient(headers),
  };
};
