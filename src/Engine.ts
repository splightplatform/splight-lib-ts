import { AlertEventsClient } from './engine/alerts/Alerts.js';
import {
  FileSystemClient,
  FilesClient,
  FoldersClient,
} from './engine/files/Files.js';
import {
  ActionsClient,
  AlertsClient,
  AlgorithmsClient,
  AssetKindsClient,
  AssetRelationsClient,
  AssetsClient,
  AttributesClient,
  CommandsClient,
  CommentsClient,
  ComponentObjectsClient,
  ComponentRoutinesClient,
  ComponentsClient,
  ComputeNodesClient,
  ConnectorsClient,
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
    assetActions: ActionsClient(headers),
    assetRelations: AssetRelationsClient(headers),
    commands: CommandsClient(headers),
    comments: CommentsClient(headers),
    functions: FunctionsClient(headers),
    files: FilesClient(headers),
    folders: FoldersClient(headers),
    fileSystem: FileSystemClient(headers),
    algorithms: AlgorithmsClient(headers),
    components: ComponentsClient(headers),
    connectors: ConnectorsClient(headers),
    componentObjects: ComponentObjectsClient(headers),
    componentRoutines: ComponentRoutinesClient(headers),
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
