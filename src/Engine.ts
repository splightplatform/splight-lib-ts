import { AlertEventsClient } from './engine/alerts/Alerts.js';
import {
  FileSystemClient,
  FilesClient,
  FoldersClient,
} from './engine/files/Files.js';
import {
  AlertsClient,
  AssetKindsClient,
  AssetRelationsClient,
  AssetsClient,
  AttributesClient,
  CommentsClient,
  ComponentCommandsClient,
  ComponentObjectsClient,
  ComponentRoutinesClient,
  ComponentsClient,
  ComputeNodesClient,
  DashboardChartItemsClient,
  DashboardChartsClient,
  DashboardTabsClient,
  DashboardsClient,
  DatalakeDataClient,
  FunctionsClient,
  MetadataClient,
  SecretsClient,
  SolutionsClient,
} from './engine/index.js';
import { Headers } from './types.js';

export const Engine = (headers: Headers) => {
  return {
    alerts: AlertsClient(headers),
    alertEvents: AlertEventsClient(headers),
    assets: AssetsClient(headers),
    assetKinds: AssetKindsClient(headers),
    assetAttributes: AttributesClient(headers),
    assetMetadata: MetadataClient(headers),
    assetRelations: AssetRelationsClient(headers),
    comments: CommentsClient(headers),
    functions: FunctionsClient(headers),
    files: FilesClient(headers),
    folders: FoldersClient(headers),
    fileSystem: FileSystemClient(headers),
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
    datalakeData: DatalakeDataClient(headers), // TODO rename this
    solutions: SolutionsClient(headers),
  };
};
