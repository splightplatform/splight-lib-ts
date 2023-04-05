import { Headers } from './types.js';
import {
  AssetsClient,
  AttributesClient,
  CommunicationClient,
  ComponentCommandsClient,
  ComponentObjectsClient,
  ComponentsClient,
  DashboardsClient,
  DashboardTabsClient,
  FilesClient,
  QueriesClient,
  SecretsClient,
} from './engine/index.js';

export const Engine = (headers: Headers) => {
  return {
    assets: AssetsClient(headers),
    attributes: AttributesClient(headers),
    components: ComponentsClient(headers),
    files: FilesClient(headers),
    queries: QueriesClient(headers),
    communication: CommunicationClient(headers),
    componentObjects: ComponentObjectsClient(headers),
    componentCommands: ComponentCommandsClient(headers),
    dashboards: DashboardsClient(headers),
    dashboardTabs: DashboardTabsClient(headers),
    secrets: SecretsClient(headers),
  };
};
