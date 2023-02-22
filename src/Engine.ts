import { Headers } from "./types.js";
import {
  AssetsClient,
  AttributesClient,
  ComponentsClient,
  FilesClient,
} from "./engine/index.js";

export const Engine = (headers: Headers) => {
  return {
    assets: AssetsClient(headers),
    attributes: AttributesClient(headers),
    components: ComponentsClient(headers),
    files: FilesClient(headers),
  };
};
