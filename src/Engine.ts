import { Headers } from './types.js';
import {
  AlertsClient,
  AssetsClient,
  AttributesClient,
  CommunicationClient,
  ComponentCommandsClient,
  ComponentObjectsClient,
  ComponentsClient,
  DashboardChartAdvancedFilters,
  DashboardChartFilters,
  DashboardChartItemsClient,
  DashboardChartsClient,
  DashboardGraphEdgesClient,
  DashboardGraphNodesClient,
  DashboardGraphsClient,
  DashboardGraphsEdgesBulkClient,
  DashboardGraphsNodesBulkClient,
  DashboardsClient,
  DashboardTabsClient,
  DatalakeDataClient,
  DeploymentsClient,
  FilesClient,
  QueriesClient,
  SecretsClient,
  SetPointsClient,
} from './engine/index.js';

export const Engine = (headers: Headers) => {
  return {
    alerts: AlertsClient(headers),
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
    dashboardCharts: DashboardChartsClient(headers),
    dashboardChartItems: DashboardChartItemsClient(headers),
    dashboardChartFilters: DashboardChartFilters(headers),
    dashboardChartAdvancedFilters: DashboardChartAdvancedFilters(headers),
    graphsClient: DashboardGraphsClient(headers),
    graphNodesClient: DashboardGraphNodesClient(headers),
    graphNodesBulkClient: DashboardGraphsNodesBulkClient(headers),
    graphEdgesClient: DashboardGraphEdgesClient(headers),
    graphEdgesBulkClient: DashboardGraphsEdgesBulkClient(headers),
    secrets: SecretsClient(headers),
    setPoints: SetPointsClient(headers),
    deployments: DeploymentsClient(headers),
    datalakeData: DatalakeDataClient(headers),
  };
};
