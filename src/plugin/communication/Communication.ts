import { get } from '../../rest/BaseMethods.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface CommunicationChannelData {
  user_id: string;
  user_info: JSON;
}

export interface CommunicationContext {
  auth_endpoint: string;
  auth_headers: JSON;
  key: string;
  channel: string;
  private_room_channel: string;
  presence_room_channel: string;
  channel_data: CommunicationChannelData;
}

export const CommunicationClient = (headers: Headers) => {
  const basePath = Path('v2/plugin/communication/');
  return {
    context: () =>
      get<CommunicationContext>(basePath.slash('context').url, headers),
  };
};
