/*


class CommunicationContextSerializer(serializers.Serializer):
    auth_endpoint = serializers.CharField()
    auth_headers = serializers.JSONField(required=False, allow_null=True)
    key = serializers.CharField()
    channel = serializers.CharField()
    private_room_channel = serializers.CharField()
    presence_room_channel = serializers.CharField()
    channel_data = CommunicationChannelDataSerializer(required=False, allow_null=True)

class CommunicationChannelDataSerializer(serializers.Serializer):
    user_id = serializers.CharField()
    user_info = serializers.JSONField()

*/

import { get } from "../../rest/BaseMethods.js";
import { Headers } from "../../types.js";
import { Path } from "../../Urls.js";

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
  const basePath = Path("engine/communication/");
  return {
    context: () =>
      get<CommunicationContext>(basePath.slash("context").url, headers),
  };
};
