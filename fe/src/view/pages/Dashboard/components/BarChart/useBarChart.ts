import {useDashboard} from "../../DashboardContext/useDashboard";

export const useBarChart = () => {
  const {average} = useDashboard();

  const data = average;

  return {
    data,
  };
};
