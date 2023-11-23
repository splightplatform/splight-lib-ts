import { Headers } from './types.js';
import {
  AlertsClient,
  AssetsClient,
  AttributesClient,
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
  FilesClient,
  ComputeNodesClient,
  QueriesClient,
  SecretsClient,
  FunctionsClient,
  WeatherClient,
} from './engine/index.js';

export const Engine = (headers: Headers) => {
  return {
    alerts: AlertsClient(headers),
    assets: AssetsClient(headers),
    assetAttributes: AttributesClient(headers),
    assetMetadata: MetadataClient(headers),
    functions: FunctionsClient(headers),
    files: FilesClient(headers),
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
    queries: QueriesClient(headers), // TO DEPRECATE
  };
};
