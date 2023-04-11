import { Headers } from './types.js';
import {
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
    dashboardCharts: DashboardChartsClient(headers),
    dashboardChartItems: DashboardChartItemsClient(headers),
    dashboardChartFilters: DashboardChartFilters(headers),
    dashboardChartAdvancedFilters: DashboardChartAdvancedFilters(headers),
    secrets: SecretsClient(headers),
  };
};
