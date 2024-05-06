import {useDashboard} from "../../DashboardContext/useDashboard";

export const useCalendarChartCard = () => {
  const {isEmpty, isFetchingEfficiencies} = useDashboard();

  return {isEmpty, isFetchingEfficiencies};
};
