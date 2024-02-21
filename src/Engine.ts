import { Headers } from './types.js';
import {
  AlertsClient,
  AssetsClient,
  AssetKindsClient,
  AttributesClient,
  AssetRelationshipClient,
  CommentsClient,
  MetadataClient,
  CommunicationClient,
  ComponentCommandsClient,
  ComponentObjectsClient,
  ComponentRoutinesClient,
  ComponentsClient,
  DashboardChartItemsClient,
  DashboardChartsClient,
  DashboardsClient,
  DashboardTabsClient,
  DatalakeDataClient,
  ComputeNodesClient,
  SecretsClient,
  FunctionsClient,
  WeatherClient,
} from './engine/index.js';
import { AlertEventsClient } from './engine/alerts/Alerts.js';
import {
  FileSystemClient,
  FilesClient,
  FoldersClient,
} from './engine/files/Files.js';

export const Engine = (headers: Headers) => {
  return {
    alerts: AlertsClient(headers),
    alertEvents: AlertEventsClient(headers),
    assets: AssetsClient(headers),
    assetKinds: AssetKindsClient(headers),
    assetAttributes: AttributesClient(headers),
    assetMetadata: MetadataClient(headers),
    assetRelationship: AssetRelationshipClient(headers),
    comments: CommentsClient(headers),
    functions: FunctionsClient(headers),
    files: FilesClient(headers),
    folders: FoldersClient(headers),
    fileSystem: FileSystemClient(headers),
    communication: CommunicationClient(headers),
    components: ComponentsClient(headers),
    componentObjects: ComponentObjectsClient(headers),
    componentRoutines: ComponentRoutinesClient(headers),
    componentCommands: ComponentCommandsClient(headers),
    dashboards: DashboardsClient(headers),
    dashboardTabs: DashboardTabsClient(headers),
    dashboardCharts: DashboardChartsClient(headers),
    dashboardChartItems: DashboardChartItemsClient(headers),
    computeNodes: ComputeNodesClient(headers),
    secrets: SecretsClient(headers),
    weather: WeatherClient(headers),
    datalakeData: DatalakeDataClient(headers), // TO RENAME
  };
};
