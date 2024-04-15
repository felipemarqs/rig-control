import {useDashboard} from "../../DashboardContext/useDashboard";

export const useLineChartCard = () => {
  const {isFetchingEfficiencies, isEmpty} = useDashboard();
  return {isFetchingEfficiencies, isEmpty};
};
