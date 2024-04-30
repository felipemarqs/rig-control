import {useDashboard} from "../../DashboardContext/useDashboard";

export const useDataGridCard = () => {
  const {isEmpty, isFetchingEfficiencies, efficiencies, windowWidth} =
    useDashboard();

  return {isEmpty, isFetchingEfficiencies, efficiencies, windowWidth};
};
