import { Headers } from "./types.js";
import {
  AssetsClient,
  AttributesClient,
  CommunicationClient,
  ComponentsClient,
  FilesClient,
  QueriesClient,
} from "./engine/index.js";

export const Engine = (headers: Headers) => {
  return {
    assets: AssetsClient(headers),
    attributes: AttributesClient(headers),
    components: ComponentsClient(headers),
    files: FilesClient(headers),
    queries: QueriesClient(headers),
    communication: CommunicationClient(headers),
  };
};
